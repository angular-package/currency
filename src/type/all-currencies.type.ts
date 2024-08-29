import { CryptoCurrencies } from './crypto-currencies.type';
import { FiatCurrencies } from './fiat-currencies.type';

export type AllCurrencies<Additional extends string> =
  | CryptoCurrencies
  | FiatCurrencies
  | Additional;
