const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        main: "./js/index.js",
    },
    output: {
        filename: "js/[name].js",
        path: path.resolve(__dirname, "../", 'build'),
        assetModuleFilename: 'images/[name].[ext]'
    },
    module: {
        rules: [


            {
                test: /\.(css)$/,
                use: ["style-loader", "css-loader",]
            },
            {
                test: /\.(sass|scss)$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(jpg|png|svg|gif|jpeg)$/,
                type: 'asset',

            },
            {
                test: /\.(mp3)$/,
                type: 'asset',

            },
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './index.html',
        })

    ],
    devServer: {
        open: true,
        static: path.resolve(__dirname, '../', 'public'),
    },
}




