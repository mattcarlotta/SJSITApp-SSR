/* istanbul ignore file */
import get from "lodash.get";
import axios from "axios";

axios.defaults.withCredentials = true;

const { IMAGEAPI, baseURL } = process.env;

const app = axios.create({
	baseURL,
});

app.interceptors.response.use(
	response => response,
	error => {
		const err = get(error, ["response", "data", "err"]);

		return Promise.reject(err || error.message);
	},
);

export const avatarAPI = axios.create({
	baseURL: `${IMAGEAPI}/api/avatar/`,
});

avatarAPI.interceptors.response.use(
	response => response,
	error => {
		const err = get(error, ["response", "data", "err"]);

		return Promise.reject(err || error.message);
	},
);

export default app;
