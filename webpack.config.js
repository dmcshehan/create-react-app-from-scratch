const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = (env) => {
	console.log(env);

	return {
		mode: 'development',
		entry: './src/js/main.js',
		output: {
			filename: '[name].js',
			path: path.resolve(__dirname, 'dist'),
		},

		module: {
			rules: [
				{
					test: /\.(js|jsx)$/,
					exclude: /(node_modules|bower_components)/,
					use: {
						loader: 'babel-loader',
						options: {
							presets: ['@babel/preset-env'],
						},
					},
				},
				{
					test: /\.(c|sa|cs)ss$/,

					use: [
						{
							loader: MiniCssExtractPlugin.loader,
							options: {
								sourceMap: true,
							},
						},
						'css-loader',
						'sass-loader',
					],
				},
				{
					test: /\.(png|svg|jpg|gif|ico|pdf)$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
							},
						},
					],
				},
				{
					test: /\.json$/,
					use: [
						{
							loader: 'file-loader',
							options: {
								name: '[name].[ext]',
							},
						},
					],
				},
			],
		},
		plugins: [
			new CleanWebpackPlugin(),
			new CopyPlugin({
				patterns: [{ from: './src/static' }],
			}),
			new HTMLWebpackPlugin({
				filename: env.development ? 'index.html' : 'popup.html',
				template: './src/index.html',
			}),
			new MiniCssExtractPlugin({
				filename: '[name].css',
			}),
		],
	};
};
