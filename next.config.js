require("./env");
require("./database");
require("./models/all");
const openBrowser = require("react-dev-utils/openBrowser");
const { antConfig, optimizations, plugins, rules, paths } = require("./config");

const { inDevelopment, LOCALHOST } = process.env;

/* opens a browser window */
if (inDevelopment) openBrowser(LOCALHOST);

module.exports = {
	distDir: "dist",
	webpack(config, { defaultLoaders, isServer }) {
		/* adds custom aliased extensions */
		config.resolve.extensions.push(".css", ".sass", ".scss");

		/* adds custom rules to client and server */
		config.module.rules.push(...rules(isServer, defaultLoaders));

		if (!isServer) {
			config.resolve.alias = {
				...config.resolve.alias,
				"@ant-design/icons/lib/dist$": paths.icons,
			};
		}

		/* adds custom rules to handle ant's css imports */
		antConfig(config, isServer);

		/* adds custom plugins to client and server */
		config.plugins.push(...plugins(isServer));

		/* adds custom split chunk optimizations to client and server */
		config.optimization.splitChunks.cacheGroups = optimizations(
			isServer,
			config,
		);

		/* return new config to next */
		return config;
	},
};
