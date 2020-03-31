import React from "react";
import SendMailForm from "~containers/Forms/Mail/SendMailForm";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";
import { app } from "~utils";
import { parseCookie, parseData } from "~utils/parseResponse";
import { setMemberNames } from "~actions/Members";
import { resetServerMessage } from "~actions/Messages";
import dispatchError from "~utils/dispatchError";

const SendMailPage = () => <SendMailForm />;

SendMailPage.getInitialProps = async ({ store: { dispatch }, req }) => {
	const headers = parseCookie(req);

	try {
		dispatch(resetServerMessage());

		const res = await app.get("members/names", headers);
		const data = parseData(res);

		dispatch(setMemberNames(data));
	} catch (e) {
		dispatchError({ dispatch, message: e.toString() });
	}

	return {};
};

export default requiresStaffCredentials(SendMailPage);
