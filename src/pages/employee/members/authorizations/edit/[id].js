import React from "react";
import EditAuthorizationForm from "~containers/Forms/Member/EditAuthorizationForm";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";
import { app } from "~utils";
import { parseCookie, parseData } from "~utils/parseResponse";
import { resetTokens, setToken } from "~actions/Members";
import { resetServerMessage } from "~actions/Messages";
import dispatchError from "~utils/dispatchError";

const EditAuthorizationsPage = () => <EditAuthorizationForm />;

EditAuthorizationsPage.getInitialProps = async ({
	store: { dispatch },
	req,
	query,
}) => {
	const { id } = query;
	const headers = parseCookie(req);

	try {
		dispatch(resetServerMessage());
		dispatch(resetTokens());

		let res = await app.get(`token/edit/${id}`, headers);
		const tokenData = parseData(res);

		res = await app.get("seasons/all/ids", headers);
		const seasonData = parseData(res);

		dispatch(setToken({ ...tokenData.token, seasonIds: seasonData.seasonIds }));
	} catch (e) {
		dispatchError({ dispatch, message: e.toString() });
	}

	return {};
};

export default requiresStaffCredentials(EditAuthorizationsPage);
