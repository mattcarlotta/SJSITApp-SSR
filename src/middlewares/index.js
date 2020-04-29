/* eslint disable */
import morgan from "morgan";
import session from "cookie-session";
import passport from "passport";
import { sendError } from "~utils/helpers";

const { cookieKey, inDevelopment, inProduction, inStaging } = process.env;

export default next => (req, res) => {
	return new Promise(async resolve => {
		try {
			const middlewares = [
				session({
					path: "/",
					keys: [cookieKey],
					name: "SJSITApp",
					maxAge: 2592000000,
					httpOnly: true,
					secure: inProduction && !inStaging ? "Lax" : "None",
				}),
				inDevelopment && morgan("tiny"),
				passport.initialize(),
			].filter(Boolean);

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
			return resolve(sendError(error, 400, res));
		}
	});
};
/* eslint enable */
