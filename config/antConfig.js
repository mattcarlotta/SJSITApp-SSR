const antStyles = /antd\/.*?\/style\/css.*?/;

module.exports = (config, isServer) => {
	if (isServer) {
		const origExternals = [...config.externals];
		config.externals = [
			(context, request, callback) => {
				if (request.match(antStyles)) return callback();
				if (typeof origExternals[0] === "function") {
					origExternals[0](context, request, callback);
				} else {
					callback();
				}
			},
			...(typeof origExternals[0] === "function" ? [] : origExternals),
		];

		config.module.rules.unshift({
			test: antStyles,
			use: "null-loader",
		});
	}
};
