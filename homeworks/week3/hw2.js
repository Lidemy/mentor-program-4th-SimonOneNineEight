const readline = require('readline');

/* eslint no-use-before-define: 0 */
/* eslint no-plusplus: 0 */
/* eslint no-shadow: 0 */
/* eslint no-param-reassign: 0 */
const rl = readline.createInterface({
  input: process.stdin,
});

const lines = [];

rl.on('line', (line) => {
  lines.push(line);
});

rl.on('close', () => {
  solve(lines);
});

function solve(lines) {
  const arr = lines[0].split(' ');
  const min = Number(arr[0]);
  const max = Number(arr[1]);
  for (let i = min; i <= max; i++) {
    if (narcissistic(i)) {
      console.log(i);
    }
  }
}

const narcissistic = (n) => {
  const length = countDigit(n);
  let m = n;
  let sum = 0;
  while (m !== 0) {
    const num = m % 10;
    sum += num ** length;
    m = Math.floor(m / 10);
  }
  return sum === n;
};


const countDigit = (n) => {
  let result = 0;
  if (n === 0) return 1;
  while (n !== 0) {
    n = Math.floor(n / 10);
    result++;
  }
  return result;
};
