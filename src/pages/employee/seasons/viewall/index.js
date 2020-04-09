import React from "react";
import ViewSeasons from "~containers/Body/ViewSeasons";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";
import app from "~utils/axiosConfig";
import { parseCookie, parseData } from "~utils/parseResponse";
import { resetSeasons, setSeasons } from "~actions/Seasons";
import { stringifyQuery } from "~utils/queryHelpers";

const ViewSeasonsPage = () => <ViewSeasons />;

ViewSeasonsPage.getInitialProps = async ({
	store: { dispatch },
	req,
	query,
}) => {
	const { page } = query;

	try {
		dispatch(resetSeasons());

		const queries = stringifyQuery(!page ? { page: 1, ...query } : query);
		const res = await app.get(`seasons/all?${queries}`, parseCookie(req));
		const data = parseData(res);

		dispatch(setSeasons(data));
	} catch (e) {
		return { serverError: e.toString() };
	}

	return {};
};

export default requiresStaffCredentials(ViewSeasonsPage);
