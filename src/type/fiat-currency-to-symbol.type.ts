import { FiatCurrencySymbol } from './fiat-currency-symbol.type';
export type FiatCurrencyToSymbol<Currency extends keyof FiatCurrencySymbol> =
  `${FiatCurrencySymbol[Currency]}`;
