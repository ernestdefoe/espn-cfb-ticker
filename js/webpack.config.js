const path = require('path');

module.exports = {
  mode: 'production',
  entry: {
    forum: './forum.js',
    admin: './admin.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    library: 'module.exports',
    libraryTarget: 'assign',
  },
  externals: {
    '@flarum/core/forum': 'flarum.core',
    '@flarum/core/admin': 'flarum.core',
    mithril: 'm',
    jquery: 'jQuery',
  },
};
