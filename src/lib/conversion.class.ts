// Class.
import { CurrencyValue } from './currency-value.class';
// Type.
import { ConversionRates } from '../type/conversion-rates.type';
/**
 *
 */
export abstract class Conversion<
  FromCurrency extends string,
  Currencies extends string = string
> {
  /**
   * Link for your api
   */
  public static api = `https://api.exchangerate-api.com/v4/latest/`;

  /**
   *
   */
  public get amount(): number {
    return this.#amount;
  }

  /**
   *
   */
  public get fromCurrency(): FromCurrency {
    return this.#fromCurrency;
  }

  /**
   *
   */
  #amount: number;

  /**
   *
   */
  #fromCurrency: FromCurrency;

  /**
   *
   */
  #conversionRate: Map<Currencies, number> = new Map();

  /**
   *
   * @param amount
   * @param fromCurrency
   * @param conversionRate
   * @angularpackage
   */
  constructor(
    amount: number,
    fromCurrency: FromCurrency,
    conversionRate?: ConversionRates<Currencies>
  ) {
    this.#amount = amount;
    this.#fromCurrency = fromCurrency;
    this.setConversionRates(conversionRate);
  }

  /**
   *
   * @param amount
   * @returns
   * @angularpackage
   */
  public setAmount(amount: number): this {
    this.#amount = amount;
    return this;
  }

  /**
   *
   * @param currency
   * @returns
   * @angularpackage
   */
  public to<ToCurrency extends Currencies>(
    currency: ToCurrency
  ): `${ToCurrency} ${number}` {
    const conversionRate = this.#conversionRate.get(currency);
    return this.#conversionRate.has(currency)
      ? new CurrencyValue(
          typeof conversionRate === 'number'
            ? this.#amount * conversionRate
            : 1,
          currency
        ).withCurrency
      : new CurrencyValue(this.#amount * 1, currency).withCurrency;
  }

  /**
   * TODO: convert to All.
   * @param currencies
   * @returns
   * @angularpackage
   */
  public toMany<ToCurrencies extends Currencies>(
    onSuccess: (exchanged: ConversionRates<ToCurrencies>) => any,
    onReject: (reason: any) => PromiseLike<never>,
    ...currencies: ToCurrencies[]
  ): this {
    // Prepare exchanged.
    const exchanged: ConversionRates<ToCurrencies> = {} as any;
    // Fetch from api specific currency.
    this.fetch(
      this.#fromCurrency,
      (result) => {
        // Set conversion rats into the object.
        this.setConversionRates(result.rates || result.conversion_rates);
        // Convert.
        currencies.forEach((currency) =>
          Object.assign(exchanged, {
            [currency]: this.to(currency),
          })
        );
        onSuccess(exchanged);
      },
      onReject
    );
    return this;
  }

  /**
   *
   * @param fromCurrency
   * @param onSuccess
   * @param onReject
   * @angularpackage
   */
  private fetch(
    fromCurrency: FromCurrency,
    onSuccess?: ((value: any) => any) | null | undefined,
    onReject?: ((reason: any) => PromiseLike<never>) | null | undefined
  ): void {
    fetch(`${Conversion.api}${fromCurrency}`)
      .then((currency) => currency.json())
      .then(onSuccess, onReject);
  }

  /**
   *
   * @param conversionRates
   * @angularpackage
   */
  private setConversionRates(
    conversionRates?: ConversionRates<Currencies>
  ): any {
    typeof conversionRates === 'object' &&
      (Object.keys(conversionRates) as Currencies[]).forEach(
        (conversionCurrency) => {
          const conversionRate = conversionRates[conversionCurrency];
          typeof conversionRate === 'number' &&
            conversionRate > 0 &&
            this.#conversionRate.set(conversionCurrency, conversionRate);
        }
      );
  }
}
