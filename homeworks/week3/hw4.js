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
  const temp = lines[0];
  const revTemp = revStr(temp);
  if (temp === revTemp) {
    console.log(true);
  } else {
    console.log(false);
  }
}

const revStr = (str) => {
  let result = '';
  for (let i = str.length - 1; i >= 0; i--) {
    result += str[i];
  }
  return result;
};
