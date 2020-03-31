import React from "react";
import requiresBasicCredentials from "~containers/Auth/requiresBasicCredentials";
import ViewSettings from "~containers/Body/ViewSettings";
import { app } from "~utils";
import { updateUser } from "~actions/Auth";
import { setMemberToReview } from "~actions/Members";
import { parseCookie, parseData } from "~utils/parseResponse";
import dispatchError from "~utils/dispatchError";

const SettingsPage = () => <ViewSettings />;

SettingsPage.getInitialProps = async ({ req, store: { dispatch } }) => {
	const headers = parseCookie(req);

	try {
		let res = await app.get(`member/settings`, headers);
		const basicMemberInfo = parseData(res);

		res = await app.get("member/settings/availability", headers);
		const memberAvailability = parseData(res);

		const { member } = basicMemberInfo;

		dispatch(
			updateUser({
				firstName: member.firstName,
				lastName: member.lastName,
			}),
		);

		dispatch(
			setMemberToReview({
				...basicMemberInfo,
				memberAvailability,
			}),
		);
	} catch (e) {
		dispatchError({ dispatch, message: e.toString() });
	}

	return {};
};

export default requiresBasicCredentials(SettingsPage);
