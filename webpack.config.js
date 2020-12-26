path = require('path');

module.exports = {
    mode: "development",
    devtool: "source-map",
    entry: {
        main: './src/frontend/index.jsx',
        notLoggedIn: './src/frontend/NotLoggedIn.jsx'
    },
    resolve: {
        extensions: [".jsx", ".js", ".mjs"]
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ["style-loader", "css-loader"]
        },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            }]
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, 'public/js'),
    },
};