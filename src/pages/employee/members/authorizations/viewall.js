import React from "react";
import ViewAuthorizations from "~containers/Body/ViewAuthorizations";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";
import { app } from "~utils";
import { parseCookie, parseData } from "~utils/parseResponse";
import { resetTokens, setTokens } from "~actions/Members";
import dispatchError from "~utils/dispatchError";
import { stringifyQuery } from "~utils/queryHelpers";

const ViewAuthorizationsPage = () => <ViewAuthorizations />;

ViewAuthorizationsPage.getInitialProps = async ({
	store: { dispatch },
	req,
	query,
}) => {
	const { page } = query;
	const headers = parseCookie(req);

	try {
		dispatch(resetTokens());
		const queries = stringifyQuery(!page ? { page: 1, ...query } : query);
		const res = await app.get(`tokens/all?${queries}`, headers);
		const data = parseData(res);
		dispatch(setTokens(data));
	} catch (e) {
		dispatchError({ dispatch, message: e.toString() });
	}

	return {};
};

export default requiresStaffCredentials(ViewAuthorizationsPage);
