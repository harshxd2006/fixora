import { supabase } from './supabase';
import { products } from '../data/products';

function generateOrderNumber() {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `#FIX-${randomNum}`;
}

export const createOrder = async ({ items, customerInfo, shippingAddress, userId }) => {
  // 1. Try calling serverless API endpoint /api/create-order
  try {
    const res = await fetch('/api/create-order', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, customerInfo, shippingAddress, userId })
    });

    const contentType = res.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      const data = await res.json();
      if (res.ok && data.success) {
        return data;
      }
      if (data.error) {
        throw new Error(data.error);
      }
    }
  } catch (err) {
    // If it's a business error from API, throw it immediately
    if (err.message && !err.message.includes('JSON') && !err.message.includes('fetch')) {
      throw err;
    }
  }

  // 2. Resilient Direct Supabase Fallback (for Vite dev server without Vercel CLI running)
  if (!items || !Array.isArray(items) || items.length === 0) {
    throw new Error('Cart is empty or invalid item list provided.');
  }

  const validatedItems = [];
  let subtotal = 0;

  for (const item of items) {
    const quantity = Number(item.quantity);
    if (!Number.isInteger(quantity) || quantity <= 0) {
      throw new Error(`Invalid item quantity (${item.quantity})`);
    }

    const dbProduct = products.find(p => p.id === item.id);
    if (!dbProduct) {
      throw new Error(`Product not found for ID: ${item.id}`);
    }

    const actualPrice = dbProduct.price;
    subtotal += actualPrice * quantity;

    validatedItems.push({
      productId: dbProduct.id,
      productName: dbProduct.name,
      price: actualPrice,
      quantity
    });
  }

  let discount = 0;
  const totalUnits = validatedItems.reduce((acc, i) => acc + i.quantity, 0);
  if (totalUnits >= 3) {
    discount = Math.round(subtotal * 0.15); // 15% Fixora Bundle Discount
  }

  const shippingFee = (subtotal - discount) > 1999 ? 0 : 149;
  const finalTotal = Math.max(0, subtotal - discount + shippingFee);
  const orderNumber = generateOrderNumber();

  // Insert into public.orders
  let orderData = null;
  const { data, error: orderError } = await supabase
    .from('orders')
    .insert({
      order_number: orderNumber,
      user_id: userId || null,
      customer_name: customerInfo.fullName,
      customer_email: customerInfo.email,
      customer_phone: customerInfo.phone,
      shipping_address: shippingAddress,
      total_amount: finalTotal,
      payment_status: 'pending',
      order_status: 'processing'
    })
    .select()
    .single();

  if (orderError) {
    console.error('Supabase order insert error:', orderError);
    throw new Error(`Supabase order insert error: ${orderError.message}`);
  }

  orderData = data;

  // Insert into public.order_items
  const orderItemRows = validatedItems.map(item => ({
    order_id: orderData.id,
    product_id: item.productId,
    product_name: item.productName,
    price: item.price,
    quantity: item.quantity
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItemRows);

  if (itemsError) {
    console.error('Supabase order_items insert error:', itemsError);
    // Rollback order row if order_items insert fails
    await supabase.from('orders').delete().eq('id', orderData.id);
    throw new Error(`Supabase order items insert error: ${itemsError.message}`);
  }

  return {
    success: true,
    orderId: orderData.id,
    orderNumber: orderData.order_number,
    subtotal,
    discount,
    shippingFee,
    totalAmount: finalTotal,
    paymentStatus: orderData.payment_status,
    orderStatus: orderData.order_status
  };
};
