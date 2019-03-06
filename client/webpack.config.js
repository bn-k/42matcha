const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const htmlWebpackPlugin = new HtmlWebPackPlugin({
    template: './src/index.html',
    filename: './index.html'
});

module.exports = {
    resolve: {
        extensions: ['.js', '.jsx', '.css'],
    },
    entry: [
        '@babel/polyfill',
        './src/app.react',
    ],
    output: {
        filename: 'app.js',
        path: __dirname + '/dist'
    },
    module: {
        rules: [
            {
                test: /\.react$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css$/, loader:
                    "style-loader!css-loader"
            },
            { test: /\.png$/, loader: "url-loader?limit=100000" },
            { test: /\.jpg$/, loader: "file-loader" },
        ]
    },
    devServer: {
        proxy: {
            '/api': {
                target: {
                    host: "matcha_api_1",
                    protocol: 'http:',
                    port: 81
                },
                ignorePath: true,
                changeOrigin: true,
                secure: false
            },
            '/auth': {
                target: {
                    host: "matcha_api_1",
                    protocol: 'http:',
                    port: 81
                },
                ignorePath: false,
                changeOrigin: true,
                secure: false
            },
            '/admin': {
                target: {
                    host: "matcha_api_1",
                    protocol: 'http:',
                    port: 81
                },
                ignorePath: true,
                changeOrigin: true,
                secure: false
            },
        },
        publicPath: '/',
        historyApiFallback: true,
    },
    plugins: [
        htmlWebpackPlugin,
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        })
    ]
};