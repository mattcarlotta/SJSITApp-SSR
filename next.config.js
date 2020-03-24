require("./env");
require("./database");
require("./models/all");
const openBrowser = require("react-dev-utils/openBrowser");
const connectRedis = require("connect-redis");
const redis = require("redis");
const session = require("express-session");
const { antConfig, optimizations, plugins, rules } = require("./config");

const { inDevelopment, LOCALHOST } = process.env;

/* opens a browser window */
if (inDevelopment) openBrowser(LOCALHOST);

/* connects to local redis store */
const RedisStore = connectRedis(session);
const client = redis.createClient({
	db: 0,
	host: "127.0.0.1",
	port: 6379,
});
const store = new RedisStore({ client });

module.exports = {
	publicRuntimeConfig: {
		store,
	},
	webpack(config, { isServer }) {
		/* adds custom aliased extensions */
		config.resolve.extensions.push(".css", ".sass", ".scss");

		/* adds custom rules to client and server */
		config.module.rules.push(...rules(isServer));

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
