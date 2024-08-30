export const formatPrice = (price, currency) => {
  return Intl.NumberFormat("en-us", {
    style: "currency",
    currency: currency,
  }).format(price);
};
