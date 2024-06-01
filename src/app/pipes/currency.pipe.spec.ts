import { MyCurrencyPipe } from './currency.pipe';

describe('CurrencyPipe', () => {
  it('create an instance', () => {
    const pipe = new MyCurrencyPipe();
    expect(pipe).toBeTruthy();
  });
});
