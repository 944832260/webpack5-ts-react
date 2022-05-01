const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackBar = require("webpackbar");
const pluginsConfig = [
	new HtmlWebpackPlugin({
		filename: 'index.html',
		template: './index.html',
		hash: process.env.MODE === 'production' ? true : false,
		favicon: path.resolve(__dirname, '../src/assets/icons/favicon.png'),
		minify: process.env.MODE === 'production' ? {
			removeAttributeQuotes: true,
			collapseWhitespace: true,
		} : false,
	}),
	new MiniCssExtractPlugin({
		filename: process.env.MODE == 'production' ? 'css/[name][contenthash:8].css' : 'css/[name].css',
		chunkFilename: process.env.MODE == 'production' ? 'css/[id][contenthash:8].css' : 'css/[id].css',
	}),
];
if (process.env.MODE == 'production') {
	pluginsConfig.push(
		new CleanWebpackPlugin(),
	)
	if (process.env.AY == 'true') {
		const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
		pluginsConfig.push(
			new BundleAnalyzerPlugin(),
		)
		console.log('pluginsConfig--------[模块分析]---------------->');
	}
	console.log('CleanWebpackPlugin---[清除dist目录]------------>');
} else {
	pluginsConfig.push(
		new WebpackBar(),
	)
}
module.exports = pluginsConfig;

console.log('pluginsConfig--------[导出插件]---------------->');
