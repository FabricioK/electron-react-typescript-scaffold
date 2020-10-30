let dotenv = require('dotenv').config();
let env = dotenv.parsed;
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
    entry: path.join(__dirname, "src", "index"),
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'public'),
    },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: env.PORT,
        hot: true
    },
    plugins: [
        new Dotenv(),
        new HtmlWebpackPlugin({
            title: env.TITULO,
            template: path.join(__dirname, "src", "index.html")
        }),
        new MiniCssExtractPlugin()
    ],
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader'],
            },
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader'
                },
              },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: true }
                    }
                ]
            }
        ],
    },
};