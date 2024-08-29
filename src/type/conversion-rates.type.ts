/**
 *
 */
export type ConversionRates<OfCurrency extends string> = {
  [Key in OfCurrency]?: number;
};
