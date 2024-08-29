import { CurrencyValue } from '../lib/currency-value.class';





const v = new CurrencyValue(42345255.356, 'USD');

console.log(`v.valueOf(): `, v);
console.log(`v.valueOf(): `, v.valueOf());
console.log(`v.currency: `, v.currency);
console.log(`v.value: `, v.of);
console.log(`v.getValueOfCurrency('USD'):`, v.getValueAsCurrency(''));
