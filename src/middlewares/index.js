/* eslint disable */
import bodyParser from "body-parser";
import compression from "compression";
import morgan from "morgan";
import moment from "moment-timezone";
import session from "cookie-session";
import passport from "passport";
import { sendError } from "~utils/helpers";
import applyMiddleware from "./applyMiddleware";

moment.tz.setDefault("America/Los_Angeles");

const { cookieKey, inProduction } = process.env;

const inProd = inProduction === "true";

const logging = inProd
	? ":remote-addr [:date] :referrer :method :url HTTP/:http-version :status :res[content-length]"
	: "tiny";

export default next => async (req, res) => {
	try {
		morgan.token("date", () => moment().format("MMMM Do YYYY, h:mm:ss a"));
		if (inProd) {
			morgan.token(
				"remote-addr",
				req =>
					req.headers["x-real-ip"] ||
					req.headers["x-forwarded-for"] ||
					req.connection.remoteAddress,
			);
		} // logs real ip address

		await applyMiddleware([
			compression({
				level: 6, // set compression level from 1 to 9 (6 by default)
				filter: (req, res) =>
					req.headers["x-no-compression"]
						? false
						: compression.filter(req, res), // set predicate to determine whether to compress
			}),
			session({
				path: "/",
				keys: [cookieKey],
				name: "SJSITApp",
				sameSite: inProd, // specifies same-site cookie attribute enforcement
				maxAge: 2592000000, // 30 * 24 * 60 * 60 * 1000 expire after 30 days, 30days/24hr/60m/60s/1000ms
				httpOnly: true,
				secure: inProd,
			}),
			morgan(logging),
			passport.initialize(),
			bodyParser.urlencoded({ extended: true }),
		])(req, res);

		next(req, res);
	} catch (error) {
		sendError(error, 400, res);
	}
};
/* eslint enable */
