export function currencyStringToNumber(value: string): number {
  const sanitized = value
    .replace(/[.,](?![^.,]*$)/g, "")
    .replace(",", ".")
    .replace(/\.0+$/g, "")
    .replace(/[^\d.]/g, "");

  return Number(sanitized);
}
