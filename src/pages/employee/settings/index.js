import React from "react";
import requiresBasicCredentials from "~containers/Auth/requiresBasicCredentials";
import ViewSettings from "~containers/Body/ViewSettings";
import app from "~utils/axiosConfig";
import { updateUser } from "~actions/Auth";
import { resetMembers, setMemberToReview } from "~actions/Members";
import { parseCookie, parseData } from "~utils/parseResponse";

const SettingsPage = () => <ViewSettings />;

SettingsPage.getInitialProps = async ({
	req,
	store: { dispatch, getState },
}) => {
	const headers = parseCookie(req);
	const { role } = getState().auth;
	const isEmployee = role === "employee";

	try {
		dispatch(resetMembers());

		let res = await app.get(`member/settings`, headers);
		const basicMemberInfo = parseData(res);

		let memberAvailability;
		if (isEmployee) {
			res = await app.get("member/settings/availability", headers);
			memberAvailability = parseData(res);
		}

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
		return { serverError: e.toString() };
	}

	return {};
};

export default requiresBasicCredentials(SettingsPage);
