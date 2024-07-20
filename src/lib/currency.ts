const CURRENCY = new Intl.NumberFormat(undefined, {
  currency: "PHP",
  style: "currency",
});

export function Currency(num: number) {
  return CURRENCY.format(num);
}
