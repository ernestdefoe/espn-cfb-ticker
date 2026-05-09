const path = require('path');

// All flarum/* imports are provided at runtime by Flarum core.
// We must mark them as externals so webpack doesn't bundle them.
function flarumExternals({ request }, callback) {
    if (/^flarum\//.test(request)) {
        // Convert e.g. "flarum/common/Component" → ["flarum", "common", "Component"]
        const parts = request.split('/');
        return callback(null, parts);
    }
    callback();
}

module.exports = [
    // Forum bundle
    {
        entry: path.resolve(__dirname, 'src/forum/index.js'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'forum.js',
            library: { type: 'amd' },
        },
        externalsType: 'root',
        externals: [
            flarumExternals,
            { mithril: 'm' },
        ],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                },
            ],
        },
        resolve: {
            extensions: ['.js'],
        },
        mode: 'production',
    },
    // Admin bundle
    {
        entry: path.resolve(__dirname, 'src/admin/index.js'),
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'admin.js',
            library: { type: 'amd' },
        },
        externalsType: 'root',
        externals: [
            flarumExternals,
            { mithril: 'm' },
        ],
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env'],
                        },
                    },
                },
            ],
        },
        resolve: {
            extensions: ['.js'],
        },
        mode: 'production',
    },
];
