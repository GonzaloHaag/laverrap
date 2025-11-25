const moneyFormatter = new Intl.NumberFormat("es-AR", {
  style: "currency",
  currency: "ARS",
  minimumFractionDigits: 2,
});
export function formatMoney(amount: number) {
  return moneyFormatter.format(amount);
}
