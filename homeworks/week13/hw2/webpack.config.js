const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    library: 'commentPlugin',
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
};
