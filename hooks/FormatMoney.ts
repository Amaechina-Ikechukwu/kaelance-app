/**
 * Formats a number as currency.
 * @param amount The amount of money to format.
 * @param currency The currency code, e.g., 'USD', 'EUR', 'JPY'.
 * @param locale The locale code, e.g., 'en-US', 'de-DE'.
 * @returns The formatted currency string.
 */
export function formatMoney(
  amount: number,
  currency: string = "NGN",
  locale: string = "en-US"
): string {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
  }).format(amount);
}
