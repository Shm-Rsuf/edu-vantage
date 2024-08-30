export const formatPrice = (price, currency = "USD") => {
  return Intl.NumberFormat("en-us", {
    style: "currency",
    currency: currency,
  }).format(price);
};
