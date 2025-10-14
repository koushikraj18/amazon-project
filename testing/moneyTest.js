import {formatMoney} from "../scripts/utils/money.js";

console.log('test suite: to format money');

console.log('converts cents to dollars');
if (formatMoney(1090) === '10.90'){
  console.log('passed');
}else{
  console.log('failed');
}

console.log('works with 0');
if (formatMoney(0) === '0.00'){
  console.log('passed');
}else{
  console.log('failed');
}

console.log('rounds up to nearest cent')
if (formatMoney(2000.5) === '20.01'){
  console.log('passed');
}else{
  console.log('failed');
}