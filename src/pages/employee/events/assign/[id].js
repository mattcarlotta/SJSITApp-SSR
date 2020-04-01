import React from "react";
import EventScheduleForm from "~containers/Forms/Event/EventScheduleForm";
import requiresStaffCredentials from "~containers/Auth/requiresStaffCredentials";
import { app } from "~utils";
import { resetEvents, setEventForScheduling } from "~actions/Events";
import { parseCookie, parseData } from "~utils/parseResponse";
import dispatchError from "~utils/dispatchError";

const ScheduleEventPage = () => <EventScheduleForm />;

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
		dispatchError({ dispatch, message: e.toString() });
	}

	return {};
};

export default requiresStaffCredentials(ScheduleEventPage);
