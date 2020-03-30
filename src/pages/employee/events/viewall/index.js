import React from "react";
import isEmpty from "lodash.isempty";
import ViewEvents from "~containers/Body/ViewEvents";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";
import { app } from "~utils";
import { parseCookie, parseData } from "~utils/parseResponse";
import { resetEvents, setEvents } from "~actions/Events";
import { setTeamNames } from "~actions/Teams";
import dispatchError from "~utils/dispatchError";
import { stringifyQuery } from "~utils/queryHelpers";

const ViewEventsPage = () => <ViewEvents />;

ViewEventsPage.getInitialProps = async ({
	store: { dispatch, getState },
	req,
	query,
}) => {
	const teams = getState().teams.data;
	const { page } = query;
	const headers = parseCookie(req);

	const fetchTeams = async () => {
		if (isEmpty(teams)) {
			const res = await app.get("teams/all/names", headers);
			const data = parseData(res);

			dispatch(setTeamNames(data));
		}
	};

	const fetchAllEvents = async () => {
		dispatch(resetEvents());
		const queries = stringifyQuery(!page ? { page: 1, ...query } : query);
		const res = await app.get(`events/all?${queries}`, headers);
		const data = parseData(res);

		dispatch(setEvents(data));
	};

	await Promise.all(
		[fetchTeams(), fetchAllEvents()].map(p =>
			p.catch(e => dispatchError({ dispatch, message: e.toString() })),
		),
	);

	return {};
};

export default requiresStaffCredentials(ViewEventsPage);
