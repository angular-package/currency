import { AllCurrencies } from '../type/all-currencies.type';

/**
 *
 */
export class Currencies<Names extends string> {
  /**
   *
   */
  public get currencies(): Set<AllCurrencies<Names>> {
    return this.#currencies;
  }

  /**
   *
   */
  #currencies: Set<AllCurrencies<Names>> = new Set();

  /**
   * @param currencies
   * @angularpackage
   */
  constructor(...currencies: AllCurrencies<Names>[]) {
    this.add(...currencies);
  }

  /**
   *
   * @param currencies
   * @returns
   * @angularpackage
   */
  public add(...currencies: AllCurrencies<Names>[]): this {
    currencies.forEach((currency) => this.#currencies.add(currency as Names));
    return this;
  }

  /**
   *
   * @returns
   * @angularpackage
   */
  public clear(): this {
    this.#currencies.clear();
    return this;
  }

  /**
   *
   * @param currencies
   * @returns
   * @angularpackage
   */
  public delete(...currencies: AllCurrencies<Names>[]): this {
    currencies.forEach((currency) =>
      this.#currencies.delete(currency as Names)
    );
    return this;
  }

  /**
   *
   */
  public getCurrencies(): AllCurrencies<Names>[] {
    return Array.from(this.#currencies.values()) as AllCurrencies<Names>[];
  }

  /**
   *
   * @param currencies
   * @returns
   * @angularpackage
   */
  public has(...currencies: AllCurrencies<Names>[]): boolean {
    return currencies.every((currency) =>
      this.#currencies.has(currency as Names)
    );
  }
}
