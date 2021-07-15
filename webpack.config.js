let mode = "development";

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

if (process.env.NODE_ENV === "production") mode = "production";

module.exports = {
    mode: mode,
    output: {
        assetModuleFilename: "images/[hash][ext][query]",
        clean: true,
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: "./dist",
        hot: true
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                }
            },
            {
                test: /\.css$/i,
                use: [
                    {loader: MiniCssExtractPlugin.loader,
                    options: {publicPath: ""}
                    },
                    'css-loader', 
                    'postcss-loader']
            },
            {
                test: /\.(png|svg|jpg|jpeg|gif)$/i,
                type: 'asset/resource',
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