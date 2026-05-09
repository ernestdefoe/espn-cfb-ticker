const path = require('path');

function makeConfig(entry, filename) {
    return {
        entry: path.resolve(__dirname, entry),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename,
            // Flarum 2: PHP wraps each extension script in a module object and
            // captures module.exports into flarum.extensions['extension-id'].
            library: 'module.exports',
            libraryTarget: 'assign',
        },
        externals: [
            {
                '@flarum/core/forum': 'flarum.core',
                '@flarum/core/admin': 'flarum.core',
                jquery: 'jQuery',
            },
            // NOTE: flarum.core.compat does not exist in Flarum 2.
            // All imports must use @flarum/core/* — no flarum/* fallback.
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
        devtool: 'source-map',
    };
}

module.exports = [
    makeConfig('src/forum/index.js', 'forum.js'),
    makeConfig('src/admin/index.js', 'admin.js'),
];
