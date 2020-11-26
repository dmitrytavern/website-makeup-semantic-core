
module.exports = function (config) {
	config.webpack.rules.push({
		test: /\.(woff|woff2|eot|ttf|otf)$/i,
		type: 'asset/resource',
		generator: {
			filename: 'fonts/[name][ext]'
		}
	})

	console.log('[BUNDLER]: Module fonts is loaded')
}