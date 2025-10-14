import { formatMoney } from "../scripts/utils/money.js";

describe('test suite: formatMoney',() => {
  it('converts cent into dollars',() => {
    expect(formatMoney(1090)).toEqual('10.90');
  });
  it('work with 0',() => {
    expect(formatMoney(0)).toEqual('0.00');
  });
  it('roundups to near cents',() => {
    expect(formatMoney(1000.5)).toEqual('10.01');
  });
});