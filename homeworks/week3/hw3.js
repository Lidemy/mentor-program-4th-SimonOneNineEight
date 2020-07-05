const readline = require('readline');

/* eslint no-use-before-define: 0 */
/* eslint no-plusplus: 0 */
/* eslint no-shadow: 0 */
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
  const num = Number(lines[0]);
  for (let i = 1; i <= num; i++) {
    if (isPrime(Number(lines[i]))) {
      console.log('Prime');
    } else {
      console.log('Composite');
    }
  }
}

const isPrime = (n) => {
  if (n === 1) return false;
  const arr = [];
  for (let i = 2; i < n; i++) {
    if (n % i === 0) {
      arr.push(i);
    }
  }
  return arr.length === 0;
};
