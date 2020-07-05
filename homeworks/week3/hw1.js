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

const printstar = (num) => {
  for (let i = 1; i <= num; i++) {
    let result = '';
    for (let j = 1; j <= i; j += 1) {
      result += '*';
    }
    console.log(result);
  }
};

function solve(lines) {
  const num = lines[0];
  printstar(num);
}

solve(['0']);
