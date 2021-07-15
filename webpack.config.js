let mode = "development";
const HtmlWebpackPlugin = require("html-webpack-plugin");

if (process.env.NODE_ENV === "production") mode = "production";

module.exports = {
    mode: mode,
    devServer: {
        contentBase: "./dist",
        hot: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: "Lunar",
            template: "./src/index.html"
        })
    ]
}