// Class.
import { Conversion } from './conversion.class';
// Type.
import { AllCurrencies } from '../type';
/**
 *
 */
export class Exchange<FromCurrency extends string> extends Conversion<
  FromCurrency,
  AllCurrencies<FromCurrency>
> {
  /**
   *
   */
  public static get api(): string {
    return super.api;
  }

  /**
   *
   * @param api
   * @returns
   * @angularpackage
   */
  public static setApi(api: string): void {
    Conversion.api = api;
  }

  /**
   *
   * @param amount
   * @param fromCurrency
   * @param exchangeRate
   * @angularpackage
   */
  constructor(
    amount: number,
    fromCurrency: FromCurrency,
    exchangeRate?: {
      [Key in AllCurrencies<FromCurrency>]?: number;
    }
  ) {
    super(amount, fromCurrency, exchangeRate);
  }
}
