import React from "react";
import EventScheduleForm from "~containers/Forms/Event/EventScheduleForm";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";
import app from "~utils/axiosConfig";
import { resetEvents, setEventForScheduling } from "~actions/Events";
import { parseCookie, parseData } from "~utils/parseResponse";

const ScheduleEventPage = () => <EventScheduleForm />;

/**
 * Attempts to get event for scheduling.
 *
 * @function ScheduleEventPage.getInitialProps
 * @function parseCookie - Returns a parsed res.cookie.
 * @yields {action} - A redux action to reset server messages.
 * @yields {object} - A response from a call to the API.
 * @function parseData - returns a parsed res.data.
 * @yields {object} - A response from a call to the API.
 * @function parseData - returns a parsed res.data.
 * @function dispatch - Dispatches a redux action to set event data for scheduling to redux state.
 * @throws {object} - A server message by type.
 */
ScheduleEventPage.getInitialProps = async ({
	store: { dispatch },
	req,
	query,
}) => {
	const headers = parseCookie(req);
	const { id } = query;

	try {
		dispatch(resetEvents());

		let res = await app.get(`event/review/${id}`, headers);
		const scheduleData = parseData(res);

		res = await app.get(`members/event-counts/${id}`, headers);
		const memberCountData = parseData(res);

		dispatch(setEventForScheduling({ ...scheduleData, ...memberCountData }));
	} catch (e) {
		return { serverError: e.toString() };
	}

	return {};
};

export default requiresStaffCredentials(ScheduleEventPage);
