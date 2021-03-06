import React from "react";
import ViewMemberProfile from "~containers/Body/ViewMemberProfile";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";
import app from "~utils/axiosConfig";
import { parseCookie, parseData } from "~utils/parseResponse";
import { resetMembers, setMemberToReview } from "~actions/Members";

const ViewMembersProfilePage = () => <ViewMemberProfile />;

ViewMembersProfilePage.getInitialProps = async ({
	store: { dispatch },
	query,
	req,
}) => {
	const { id } = query;
	const headers = parseCookie(req);

	try {
		dispatch(resetMembers());

		let res = await app.get(`member/review/${id}`, headers);
		const basicMemberInfo = parseData(res);

		res = await app.get(`member/availability?id=${id}`, headers);
		const memberAvailability = parseData(res);

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

export default requiresStaffCredentials(ViewMembersProfilePage);
