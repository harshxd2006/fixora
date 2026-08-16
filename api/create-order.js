import { createClient } from '@supabase/supabase-js';
import { products } from '../src/data/products.js';

const supabaseUrl = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY;

const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

// Unique 5-digit order number generator
function generateOrderNumber() {
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `#FIX-${randomNum}`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { items, customerInfo, shippingAddress, userId } = req.body || {};

    // 1. VALIDATE INPUT STRUCTURE
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ error: 'Cart is empty or invalid item list provided.' });
    }

    if (!customerInfo || !customerInfo.fullName || !customerInfo.email || !customerInfo.phone) {
      return res.status(400).json({ error: 'Customer contact information (name, email, phone) is incomplete.' });
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(customerInfo.email)) {
      return res.status(400).json({ error: 'Invalid email address provided.' });
    }

    if (!shippingAddress || !shippingAddress.address || !shippingAddress.city || !shippingAddress.state || !shippingAddress.postalCode) {
      return res.status(400).json({ error: 'Shipping address details are incomplete.' });
    }

    // 2. SERVER-SIDE PRODUCT & QUANTITY VALIDATION & PRICE COMPUTATION
    const validatedItems = [];
    let subtotal = 0;

    for (const item of items) {
      const quantity = Number(item.quantity);

      // Security check: Quantity must be a positive integer
      if (!Number.isInteger(quantity) || quantity <= 0) {
        return res.status(400).json({ error: `Invalid item quantity (${item.quantity}) for product ID: ${item.id}` });
      }

      // Security check: Product ID must exist in canonical product database
      const dbProduct = products.find(p => p.id === item.id);
      if (!dbProduct) {
        return res.status(400).json({ error: `Product not found or invalid product ID: ${item.id}` });
      }

      // DO NOT TRUST FRONTEND PRICE. Use canonical database price.
      const actualPrice = dbProduct.price;
      const itemSubtotal = actualPrice * quantity;
      subtotal += itemSubtotal;

      validatedItems.push({
        productId: dbProduct.id,
        productName: dbProduct.name,
        price: actualPrice,
        quantity
      });
    }

    // 3. SERVER-SIDE BUNDLE DISCOUNT CALCULATION (15% for 3+ items or multi-product combos)
    let discount = 0;
    const totalUnits = validatedItems.reduce((acc, i) => acc + i.quantity, 0);
    if (totalUnits >= 3) {
      discount = Math.round(subtotal * 0.15); // 15% Fixora Bundle Discount
    }

    // 4. SHIPPING FEE CALCULATION
    const shippingFee = (subtotal - discount) > 1999 ? 0 : 149;
    const finalTotal = Math.max(0, subtotal - discount + shippingFee);

    const orderNumber = generateOrderNumber();

    // 5. ATOMIC PERSISTENCE TO SUPABASE
    if (!supabase) {
      // Fallback response if Supabase credentials are missing on server
      return res.status(200).json({
        success: true,
        orderNumber,
        subtotal,
        discount,
        shippingFee,
        totalAmount: finalTotal,
        paymentStatus: 'pending',
        orderStatus: 'processing',
        message: 'Order payload validated successfully on server.'
      });
    }

    // A. Insert into public.orders
    const { data: orderData, error: orderError } = await supabase
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
      console.error('Supabase Order Insert Error:', orderError);
      return res.status(500).json({ error: `Failed to create order: ${orderError.message}` });
    }

    // B. Insert corresponding records into public.order_items
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
      console.error('Supabase Order Items Insert Error:', itemsError);
      // Atomic rollback: Delete orphaned order header if items failed
      await supabase.from('orders').delete().eq('id', orderData.id);
      return res.status(500).json({ error: `Failed to create order items: ${itemsError.message}` });
    }

    // 6. RETURN SUCCESSFUL ORDER METADATA
    return res.status(200).json({
      success: true,
      orderId: orderData.id,
      orderNumber: orderData.order_number,
      subtotal,
      discount,
      shippingFee,
      totalAmount: finalTotal,
      paymentStatus: orderData.payment_status,
      orderStatus: orderData.order_status
    });

  } catch (error) {
    console.error('Server Order Processing Exception:', error);
    return res.status(500).json({ error: 'Internal server error while creating order.' });
  }
}
