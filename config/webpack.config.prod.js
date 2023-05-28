const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CopyPlugin = require("copy-webpack-plugin");


module.exports = {
    mode: "production",
    entry: {
        main: "./js/index.js",
    },
    output: {
        filename: "js/[name]-[contenthash:6].js",
        path: path.resolve(__dirname, "../", 'build'),
        assetModuleFilename: 'images/[name]-[contenthash].[ext]'
    },

    module: {
        rules: [
            {
                test: /\.txt$/,
                use: "raw-loader",
            },
            {
                test: /\.(css)$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: { plugins: [require('autoprefixer')] }
                    }
                }]
            },

            {
                test: /\.(sass|scss)$/,
                use: [MiniCssExtractPlugin.loader, "css-loader", {
                    loader: "postcss-loader",
                    options: {
                        postcssOptions: { plugins: [require('autoprefixer')] }
                    }
                },
                    "sass-loader"]
            },
            // {Stare wersje bez postcss-loadera i autoprefixera
            //     test: /\.(css)$/,
            //     use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader",]
            // },
            // {
            //     test: /\.(sass|scss)$/,
            //     use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"] 
            // },


            {
                test: /\.(jpg|png|svg|gif|jpeg)$/,
                type: 'asset/resource',

            },
            {
                test: /\.js$/,
                loader: "babel-loader",
                exclude: /node_modules/,
                options: {
                    "presets": [
                        "@babel/preset-env" //załadowanie presetów (gotowej paczki z ustawieniami)
                    ],
                    "plugins": [
                        "@babel/plugin-proposal-class-properties"
                    ]

                }
            }

        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "css/[name]-[contenthash:6].css",
        }),
        new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            title: "nowa aplikacja",
            template: './index.html',


        }),
        // new CopyPlugin({ //plugin do kopiowania
        //     patterns: [

        //     ],
        // }),
    ],

    devServer: {
        open: true,
        static: path.resolve(__dirname, '../', 'public'),
    },
}



