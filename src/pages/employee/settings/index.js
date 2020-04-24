import React from "react";
import requiresBasicCredentials from "~containers/Auth/requiresBasicCredentials";
import ViewSettings from "~containers/Body/ViewSettings";
import app from "~utils/axiosConfig";
import { updateUser } from "~actions/Auth";
import { resetMembers, setMemberToReview } from "~actions/Members";
import { parseCookie, parseData } from "~utils/parseResponse";

const SettingsPage = () => <ViewSettings />;

/**
 * Attempts to get a single member's settings for review/editing.
 *
 * @function SettingsPage.getInitialProps
 * @function parseCookie - Returns a parsed res.cookie.
 * @function getState - Returns auth.role redux state.
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data (basic member info).
 * @yields {object} - A response from a call to the API.
 * @function parseData - Returns a parsed res.data (member event response).
 * @yields {action} - A redux action to update the user's first and last name.
 * @yields {action} - A redux action to set member data to redux state.
 * @throws {action} - A redux action to display a server message by type.
 */

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
