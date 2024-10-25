export const formatAmountforStripe = (
  amount,
  format = "en-us",
  currency = "USD"
) => {
  let priceForStripe = Intl.NumberFormat(format, {
    style: "currency",
    currency: currency,
    currencyDisplay: "symbol",
  });
  const parts = priceForStripe.formatToParts(amount);

  let zeroDecimalsCurrency = true;

  for (let part of parts) {
    if (part.type === "decimal") {
      zeroDecimalsCurrency = false;
    }
  }

  return zeroDecimalsCurrency ? amount : Math.round(amount * 100);
};
