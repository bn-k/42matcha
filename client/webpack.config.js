const HtmlWebPackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const api = {
    target: {
        host: "api",
            protocol: 'http:',
            port: 81
    },
    ignorePath: false,
        changeOrigin: true,
        secure: false
};

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
        './src/app.jsx',
    ],
    output: {
        filename: 'app.js',
        path: __dirname + '/dist'
    },
    module: {
        rules: [
            {
                test: /\.(png|svg|jpg|gif)$/,
                use:['file-loader']
            },
            {
                test: /\.jsx$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'sass-loader'
                    ]
                })
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
        disableHostCheck: true,   // That solved it
        proxy: {
            '/api': api,
            '/auth': api,
        },
        publicPath: '/',
        historyApiFallback: true,
    },
    plugins: [
        htmlWebpackPlugin,
        new ExtractTextPlugin('./src/public/css/bulma.css'),
    ]
};