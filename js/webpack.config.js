const path = require('path');

// Flarum exposes its modules via AMD as nested arrays.
// e.g. import Component from 'flarum/common/Component'
//   → external: ['flarum', 'common', 'Component']
function flarumExternals({ request }, callback) {
    if (/^flarum\//.test(request)) {
        const parts = request.split('/');
        return callback(null, parts, 'amd');
    }
    callback();
}

const sharedConfig = (entry, filename) => ({
    entry: path.resolve(__dirname, entry),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename,
        libraryTarget: 'amd',
    },
    externals: [
        flarumExternals,
        { mithril: { amd: 'mithril', root: 'm' } },
    ],
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: { presets: ['@babel/preset-env'] },
            },
        }],
    },
    mode: 'production',
});

module.exports = [
    sharedConfig('src/forum/index.js', 'forum.js'),
    sharedConfig('src/admin/index.js', 'admin.js'),
];
