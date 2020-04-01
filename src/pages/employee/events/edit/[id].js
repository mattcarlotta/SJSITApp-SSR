import React from "react";
import EditEventForm from "~containers/Forms/Event/EditEventForm";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";
import { app } from "~utils";
import { resetEvents, setEventToEdit } from "~actions/Events";
import { parseCookie, parseData } from "~utils/parseResponse";
import dispatchError from "~utils/dispatchError";

const EditEventPage = () => <EditEventForm />;

EditEventPage.getInitialProps = async ({ store: { dispatch }, req, query }) => {
	const headers = parseCookie(req);
	const { id } = query;

	try {
		dispatch(resetEvents());

		let res = await app.get(`event/edit/${id}`, headers);
		const events = parseData(res);

		res = await app.get("seasons/all/ids", headers);
		const seasons = parseData(res);

		res = await app.get("teams/all/names", headers);
		const teams = parseData(res);

		dispatch(
			setEventToEdit({
				...events.event,
				seasonIds: seasons.seasonIds,
				teams: teams.names,
			}),
		);
	} catch (e) {
		dispatchError({ dispatch, message: e.toString() });
	}

	return {};
};

export default requiresStaffCredentials(EditEventPage);
