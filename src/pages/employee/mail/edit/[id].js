import React from "react";
import EditMailForm from "~containers/Forms/Mail/EditMailForm";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";
import { app } from "~utils";
import { parseCookie, parseData } from "~utils/parseResponse";
import { resetMail, setMailToEdit } from "~actions/Mail";
import { resetServerMessage } from "~actions/Messages";
import dispatchError from "~utils/dispatchError";

const EditMailPage = () => <EditMailForm />;

EditMailPage.getInitialProps = async ({ store: { dispatch }, req, query }) => {
	const { id } = query;
	const headers = parseCookie(req);

	try {
		dispatch(resetServerMessage());
		dispatch(resetMail());

		let res = await app.get("members/names", headers);
		const membersNamesData = parseData(res);

		res = await app.get(`mail/edit/${id}`, headers);
		const emailData = parseData(res);

		dispatch(
			setMailToEdit({
				...emailData.email,
				dataSource: membersNamesData.members,
			}),
		);
	} catch (e) {
		dispatchError({ dispatch, message: e.toString() });
	}

	return {};
};

export default requiresStaffCredentials(EditMailPage);
