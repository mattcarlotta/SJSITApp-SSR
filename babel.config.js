const aliasDirs = require("alias-dirs");

module.exports = api => {
	const inProd = api.env("production");
	const inStaging = process.env.inStaging;
	api.cache.using(() => process.env.NODE_ENV);

	return {
		presets: ["next/babel"],
		plugins: [
			[
				"module-resolver",
				{
					alias: aliasDirs({
						ignoreDirectories: [...aliasDirs.ignoreDirectories, "e2e", "src"],
					}),
				},
			],
			[
				"styled-components",
				{
					ssr: true,
					displayName: !inProd,
					preprocess: false,
				},
			],
			inProd && !inStaging && "react-remove-properties",
		].filter(Boolean),
	};
};
