import React from "react";
import NewEventForm from "~containers/Forms/Event/NewEventForm";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";
import { app } from "~utils";
import { resetServerMessage } from "~actions/Messages";
import { setNewEvent } from "~actions/Events";
import { parseCookie, parseData } from "~utils/parseResponse";
import dispatchError from "~utils/dispatchError";

const CreateEventPage = () => <NewEventForm />;

CreateEventPage.getInitialProps = async ({ store: { dispatch }, req }) => {
	const headers = parseCookie(req);

	try {
		dispatch(resetServerMessage());

		let res = await app.get("seasons/all/ids", headers);
		const seasons = parseData(res);

		res = await app.get("teams/all/names", headers);
		const teams = parseData(res);

		dispatch(
			setNewEvent({
				seasonIds: seasons.seasonIds,
				teams: teams.names,
			}),
		);
	} catch (e) {
		dispatchError({ dispatch, message: e.toString() });
	}

	return {};
};

export default requiresStaffCredentials(CreateEventPage);
