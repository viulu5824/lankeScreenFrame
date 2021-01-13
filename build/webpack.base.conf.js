const path = require('path');
const env = process.env.NODE_ENV;
const webpack = require("webpack");
const htmlWebpackPlugin = require("html-webpack-plugin");
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const copyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const isDev = env === "development";
let baseConfig = {
    entry: {
        main: [
            path.join(__dirname, '../src/main.js'),
        ]
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: "[name].js",
    },
    plugins: [
        new webpack.ProgressPlugin({ percentBy: 'entries' }),
        new htmlWebpackPlugin({
            template: path.join(__dirname, "../src/index.html"),
            filename: "index.html",
            // favicon: './favicon.ico'
        }),
        new VueLoaderPlugin({
            verbose: true,
        }),
        new copyWebpackPlugin({
            patterns: [{
                from: path.join(__dirname, "../src/static"),
                to: './static'
            }]
        }),
        new BundleAnalyzerPlugin({
            analyzerMode: "disabled",
            generateStatsFile: true,
            statsFilename: path.join(__dirname, "../console/stats.json")
        })
    ],
    module: {
        // noParse://,
        rules: [
            {
                test: /\.(sa|sc|c)ss$/,
                use: [isDev ? "style-loader" : {
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                        publicPath: "../"
                    }
                }, "css-loader", "postcss-loader", {
                    loader: "sass-loader",
                },
                {
                    loader: 'sass-resources-loader',
                    options: {
                        resources: [path.join(__dirname, '../src/style/variable/variable.scss')]
                    },
                }]
            },
            {
                test: /\.(jpg|png|gif|bmp|jpeg)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: 7631,
                        name: "[hash:8]-[name].[ext]",
                        outputPath: "image",
                        esModule: false
                    }
                }]
            },
            {
                test: /\.(ttf|woff2|svg|eot|svg|woff)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        outputPath: "font",
                        esModule: false
                    }
                }],
            },
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',

                    options: {
                        cacheDirectory: true
                    }
                },
                // exclude: /(node_modules|bower_components)/,
                include: /(src|static)/
            },
            {
                test: /\.vue$/,
                use: {
                    loader: 'vue-loader',
                    options: {
                        preserveWhitespace: false,
                        optimizeSSR: false
                    }
                }
            },
        ]
    },
    resolve: {
        alias: {
            "@": path.resolve(__dirname, "..src"),
            "_c": path.resolve(__dirname, "../src/components"),
            "image": path.resolve(__dirname, "../src/image"),
            "static": path.resolve(__dirname, "../src/static"),
            "util": path.resolve(__dirname, "../src/util"),
            "view": path.resolve(__dirname, "../src/components/view"),
            "store": path.resolve(__dirname, "../src/store/index.js"),
            "router": path.resolve(__dirname, "../src/config/router.js"),
        },
        extensions: [".js", ".jsx", ".json"]
    },
    target: "browserslist"
}
module.exports = baseConfig;