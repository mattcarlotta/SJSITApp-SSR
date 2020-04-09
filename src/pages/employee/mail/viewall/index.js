import React from "react";
import ViewMail from "~containers/Body/ViewMail";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";
import app from "~utils/axiosConfig";
import { parseCookie, parseData } from "~utils/parseResponse";
import { resetMail, setMails } from "~actions/Mail";
import { stringifyQuery } from "~utils/queryHelpers";

const ViewMailPage = () => <ViewMail />;

ViewMailPage.getInitialProps = async ({ store: { dispatch }, req, query }) => {
	const { page } = query;
	const headers = parseCookie(req);

	try {
		dispatch(resetMail());
		const queries = stringifyQuery(!page ? { page: 1, ...query } : query);
		const res = await app.get(`mail/all?${queries}`, headers);
		const data = parseData(res);

		dispatch(setMails(data));
	} catch (e) {
		return { serverError: e.toString() };
	}

	return {};
};

export default requiresStaffCredentials(ViewMailPage);
