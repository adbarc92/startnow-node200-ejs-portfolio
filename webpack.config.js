const path = require('path');

module.exports = {
	context: path.join(__dirname, '/src'),

	devtool: 'source-map',

	entry: {
		javascript: './index'
	},

	mode: 'development',

	module: {
		rules: [
			{
				test: /\.js$/, // include .js files
				enforce: "pre", // preload the jshint loader
				exclude: /node_modules/, // exclude any and all files in the node_modules folder
				use: [{
					loader: "jshint-loader",
					options: {
						camelcase: true,
						emitErrors: false,
						failOnHint: false
					}
				}]
			},
			{
				test: /\.jsx?$/,
				exclude: /node_modules/,
				use: [{
					loader: 'babel-loader'
				}]
			},
			{
				test: /\.html$/,
				use: [{
					loader: 'file?name=[name].[ext]'
				}]
			},
		],
	},

	output: {
		filename: 'bundle.js',
		path: path.join(__dirname, '/dist'),
	},

	resolve: {
		alias: {
			react: path.join(__dirname, 'node_modules', 'react')
		},
		extensions: ['.js', '.jsx']
	},
	target: 'web'
}