const HtmlWebPackPlugin = require('html-webpack-plugin');

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
            { test: /\.css$/, loader: "style-loader!css-loader" },
            { test: /\.png$/, loader: "url-loader?limit=100000" },
            { test: /\.jpg$/, loader: "file-loader" },
            // {
            //
            //     test: /\.css$/,
            //     use: [
            //         {
            //             loader: "style-loader",
            //             options: {
            //                 modules: true,
            //                 importLoaders: 1,
            //                 localIdentName: "[name]_[local]_[hash:base64]",
            //                 sourceMap: true,
            //                 minimize: true
            //             }
            //         }
            //     ]
            // }
        ]
    },
    devServer: {
        proxy: {
            '/api': 'http://localhost:81',
            '/admin': 'http://localhost:81',
            '/auth': 'http://localhost:81'
        },
        publicPath: '/',
        historyApiFallback: true,
    },
    plugins: [htmlWebpackPlugin]
};