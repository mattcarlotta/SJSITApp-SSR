/* eslint disable */
import morgan from "morgan";
import session from "cookie-session";
import passport from "passport";
import moment from "~utils/momentWithTZ";
import { sendError } from "~utils/helpers";

moment.tz.setDefault("America/Los_Angeles");

const { cookieKey, inProduction } = process.env;

const inProd = inProduction === "true";

const logging = inProd
	? ":remote-addr [:date] :referrer :method :url HTTP/:http-version :status :res[content-length]"
	: "tiny";

export default next => (req, res) => {
	return new Promise(async resolve => {
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

			const middlewares = [
				session({
					path: "/",
					keys: [cookieKey],
					name: "SJSITApp",
					maxAge: 2592000000,
					sameSite: inProd,
					httpOnly: true,
					// secure: inProd,
				}),
				morgan(logging),
				passport.initialize(),
			];

			const promises = middlewares.reduce((acc, middleware) => {
				const promise = new Promise((resolve, reject) => {
					middleware(req, res, result =>
						result instanceof Error ? reject(result) : resolve(result),
					);
				});
				return [...acc, promise];
			}, []);

			await Promise.all(promises);

			return next(req, res, resolve);
		} catch (error) {
			sendError(error, 400, res);
			return resolve();
		}
	});
};
/* eslint enable */
