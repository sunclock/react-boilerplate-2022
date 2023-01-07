const path = require('path');
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
	devtool: "inline-source-map",
	resolve: {
		extensions: [".ts", ".tsx", ".js", ".jsx"],
		alias: {
			"@types": path.resolve(__dirname, "src/@types"),
			"@hooks": path.resolve(__dirname, "src/@hooks"),
			"@assets": path.resolve(__dirname, "src/@assets"),
		},
	},
	mode: 'development',
	entry: "./src/index.tsx",
	devServer: {
		historyApiFallback: true,
		static: 'dist',
		port: 9000,
		hot: true,
		open: true,
	},
	output: {
		filename: 'bundle.js',
		path: path.resolve(__dirname, 'dist')
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
			{
				test: /\.html$/,
				use: [
					{
						loader: 'html-loader',
						options: {
							minimize: true,
						},
					},
				],
			},
			{
				test: /\.(ts|tsx)$/,
				use: "ts-loader",
				exclude: /node_modules/,
			},
			{
				test: /\.css$/i,
				include: path.resolve(__dirname, 'src'),
				use: ['style-loader', 'css-loader', 'postcss-loader'],
			},
		]
	},
	plugins: [
		new CleanWebpackPlugin(), // 웹팩 실행시마다 dist 폴더 정리
		new HtmlWebpackPlugin({
			template: "./src/index.html",
		}),
	],
};