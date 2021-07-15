let mode = "development";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

if (process.env.NODE_ENV === "production") mode = "production";

module.exports = {
    mode: mode,
    devServer: {
        contentBase: "./dist",
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Lunar",
            template: "./src/index.html"
        }),
        new MiniCssExtractPlugin(),
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin()
        ]
    }
}