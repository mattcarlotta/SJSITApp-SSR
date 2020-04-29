const { DefinePlugin, IgnorePlugin } = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
	.BundleAnalyzerPlugin;
const ErrorOverlayPlugin = require("error-overlay-webpack-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const WebpackBar = require("webpackbar");
const address = require("address");
const {
	analyzeClientPath,
	analyzeServerPath,
	staticCSSDevPath,
	staticCSSProdPath,
} = require("./paths");

const REMOTEADDRESS = address.ip();

const {
	analyze,
	baseURL,
	cookieSecret,
	DATABASE,
	DOMAIN,
	IMAGEAPI,
	inDevelopment,
	inProduction,
	inStaging,
	inTesting,
	LOCALHOST,
	PORT,
} = process.env;

const inDev = inDevelopment === "true";
const filename = inDev ? staticCSSDevPath : staticCSSProdPath;
const chunkFilename = filename;

module.exports = isServer => {
	const plugins = [];

	if (!isServer) {
		plugins.push(
			new IgnorePlugin(/^\.\/locale$/, /moment$/),
			/* overlays browser with compilation errors */
			new ErrorOverlayPlugin(),
			/* extracts css chunks for client */
			new MiniCssExtractPlugin({
				filename,
				chunkFilename,
			}),
			/* envs for client */
			new DefinePlugin({
				"process.env": {
					baseURL: JSON.stringify(baseURL),
					cookieSecret: JSON.stringify(cookieSecret),
					DATABASE: JSON.stringify(DATABASE),
					DOMAIN: JSON.stringify(DOMAIN),
					IMAGEAPI: JSON.stringify(IMAGEAPI),
					inDevelopment: inDev,
					inProduction: JSON.stringify(inProduction),
					inStaging: JSON.stringify(inStaging),
					inTesting: JSON.stringify(inTesting),
					LOCALHOST: JSON.stringify(LOCALHOST),
				},
			}),
		);
	} else {
		plugins.push(
			/* shows a compilation bar instead of the default compile message */
			new WebpackBar({
				color: "#268bd2",
				minimal: false,
				compiledIn: false,
			}),
			/* in console error */
			new FriendlyErrorsWebpackPlugin({
				compilationSuccessInfo: {
					messages: [
						inDev && `Local development build: \x1b[1m${LOCALHOST}\x1b[0m`,
						inDev &&
							REMOTEADDRESS &&
							`Remote development build: \x1b[1mhttp://${REMOTEADDRESS}:${PORT}\x1b[0m`,
					].filter(Boolean),
					notes: [
						inDev && "Note that the development build is not optimized.",
						inDev &&
							"To create a production build, use \x1b[1m\x1b[32myarn build\x1b[0m.\n",
					].filter(Boolean),
				},
				clearConsole: inDev,
			}),
		);
	}

	if (analyze) {
		/* analyzes webpack chunk distribution */
		plugins.push(
			new BundleAnalyzerPlugin({
				analyzerMode: "static",
				reportFilename: isServer ? analyzeServerPath : analyzeClientPath,
			}),
		);
	}

	return plugins;
};
