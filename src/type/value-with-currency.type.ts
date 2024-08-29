export type ValueWithCurrency<
  Value extends number | string,
  Currency extends string
> = `${Currency} ${Value}`;
