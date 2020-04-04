import React from "react";
import ViewMembers from "~containers/Body/ViewMembers";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";
import app from "~utils/axiosConfig";
import { parseCookie, parseData } from "~utils/parseResponse";
import { resetMembers, setMembers } from "~actions/Members";
import dispatchError from "~utils/dispatchError";
import { stringifyQuery } from "~utils/queryHelpers";

const ViewMembersPage = () => <ViewMembers />;

ViewMembersPage.getInitialProps = async ({
	store: { dispatch },
	req,
	query,
}) => {
	const { page } = query;
	const headers = parseCookie(req);

	try {
		dispatch(resetMembers());
		const queries = stringifyQuery(!page ? { page: 1, ...query } : query);
		const res = await app.get(`members/all?${queries}`, headers);
		const data = parseData(res);
		dispatch(setMembers(data));
	} catch (e) {
		dispatchError({ dispatch, message: e.toString() });
	}

	return {};
};

export default requiresStaffCredentials(ViewMembersPage);
