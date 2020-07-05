const readline = require('readline');

/* eslint no-use-before-define: 0 */
/* eslint no-plusplus: 0 */
/* eslint no-shadow: 0 */
/* eslint no-continue: 0 */
/* eslint consistent-return: 0 */
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
  const count = Number(lines[0]);
  const arr = [];
  for (let i = 1; i <= count; i++) {
    arr.push((lines[i]).split(' '));
    const [a, b, k] = arr[i - 1];
    console.log(whoWin(a, b, k));
  }
}

const whoWin = (numA, numB, bigOrSmall) => {
  const a = numA.length;
  const b = numB.length;
  if (numA === numB) return 'Draw';
  if (bigOrSmall === '1') {
    if (a !== b) {
      return a > b ? 'A' : 'B';
    }
    for (let i = 0; i < a; i++) {
      if (numA[i] === numB[i]) {
        continue;
      }
      return numA[i] > numB[i] ? 'A' : 'B';
    }
  } else if (bigOrSmall === '-1') {
    if (a !== b) {
      return a < b ? 'A' : 'B';
    }
    for (let i = 0; i < a; i++) {
      if (numA[i] === numB[i]) {
        continue;
      }
      return numA[i] < numB[i] ? 'A' : 'B';
    }
  }
};
