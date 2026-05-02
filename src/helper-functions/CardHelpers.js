import { store } from "redux/store";

/* -----------------------------------------
   INTERNAL: get config safely
------------------------------------------ */
const getConfig = () => {
  const state = store?.getState();
  return state?.configData?.configData || state?.configData || {};
};

/* -----------------------------------------
   1. MAIN MONEY FORMATTER (PRODUCTION SAFE)
   Use everywhere: cart, checkout, totals
------------------------------------------ */
export const getAmountWithSign = (amount) => {
  if (amount == null || isNaN(Number(amount))) return "";

  const configData = getConfig();

  const symbol = configData?.currency_symbol || "";
  const direction = configData?.currency_symbol_direction || "left";
  const decimals = configData?.digit_after_decimal_point ?? 2;

  const formattedNumber = new Intl.NumberFormat(undefined, {
    minimumFractionDigits: 0,
    maximumFractionDigits: decimals,
  }).format(Number(amount));

  const result =
    direction === "left"
      ? `${symbol} ${formattedNumber}`
      : `${formattedNumber} ${symbol}`;

  return result.trim();
};


/* -----------------------------------------
   2. UI-ONLY COMPACT FORMAT (optional)
   Example: 5.7K, 1.2M
   DO NOT use in checkout/cart
------------------------------------------ */
export const formatCompactAmount = (amount) => {
  if (amount == null || isNaN(Number(amount))) return "";

  const num = Number(amount);

  if (num >= 1_000_000_000) return (num / 1_000_000_000).toFixed(1) + "B";
  if (num >= 1_000_000) return (num / 1_000_000).toFixed(1) + "M";
  if (num >= 1_000) return (num / 1_000).toFixed(1) + "K";

  return new Intl.NumberFormat().format(num);
};


/* -----------------------------------------
   3. DISCOUNT CALCULATION (FIXED)
------------------------------------------ */
export const getDiscountedAmount = (
  price,
  discount,
  discountType,
  quantity = 1
) => {
  let finalPrice = Number(price);

  if (discount > 0) {
    if (discountType === "amount") {
      finalPrice -= discount * quantity;
    } else if (
      discountType === "percent" ||
      discountType === "fixed"
    ) {
      finalPrice -= (discount / 100) * finalPrice;
    }
  }

  return finalPrice;
};


/* -----------------------------------------
   4. ADD-ON FORMATTER
------------------------------------------ */
export const getSelectedAddOn = (add_ons = []) => {
  return add_ons
    .filter((item) => item?.isChecked)
    .map((item) => item.name)
    .join(", ");
};


/* -----------------------------------------
   5. REFERRAL DISCOUNT
------------------------------------------ */
export const getReferDiscount = (
  totalAmount,
  refDiscount,
  refType
) => {
  if (refType === "percentage") {
    return (refDiscount / 100) * totalAmount;
  }
  return refDiscount;
};
