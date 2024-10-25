export const formatPrice = (price, format = "en-us", currency = "USD") => {
  return Intl.NumberFormat(format, {
    style: "currency",
    currency: currency,
  }).format(price);
};
