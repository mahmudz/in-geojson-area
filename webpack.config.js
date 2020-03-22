const { join } = require('path');
const include = join(__dirname, 'src');

module.exports =  {
  entry: './src/index.js',
  output: {
    path: join(__dirname, 'dist'),
    libraryTarget: 'umd',
    library: 'inGeojsonArea',
    filename: 'inGeojsonArea.umd.js'
  }
};
