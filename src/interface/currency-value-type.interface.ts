import { ValueWithCurrency } from '../type/value-with-currency.type';
/**
 *
 */
export interface CurrencyValueType<
  Value extends number,
  Currency extends string = string
> {
  formatted: string;
  of: Value;
  withCurrency: ValueWithCurrency<Value, Currency>;
}
