/* istanbul ignore file */
import get from "lodash.get";
import axios from "axios";

const { IMAGEAPI, baseURL } = process.env;

const app = axios.create({
	baseURL,
	withCredentials: true,
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
	withCredentials: true,
});

avatarAPI.interceptors.response.use(
	response => response,
	error => {
		const err = get(error, ["response", "data", "err"]);

		return Promise.reject(err || error.message);
	},
);

export default app;
