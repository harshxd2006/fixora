export const formatINR = (price) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);
};

export const getDiscount = (original, sale) => {
  if (!original || !sale || original <= sale) return null;
  const percent = Math.round(((original - sale) / original) * 100);
  return `${percent}% off`;
};
