import React from "react";
import get from "lodash.get";
import EventLabel from "~components/Body/EventLabel";

export default (result, field, events) => {
	const initializedFields = events.reduce((acc, event) => {
		const {
			_id,
			team,
			opponent,
			eventDate,
			employeeResponse,
			eventType,
			notes,
		} = event;

		const response = get(employeeResponse[0], ["response"]);
		const employeeNotes = get(employeeResponse[0], ["notes"]);

		const radioFields = {
			...field,
			id: _id,
			name: _id,
			label: (
				<EventLabel
					eventType={eventType}
					eventDate={eventDate}
					opponent={opponent}
					team={team}
				/>
			),
			disabled: false,
			value: response || "",
			updateEvent: !!response,
			notes,
		};

		const noteFields = {
			id: _id,
			name: `${_id}-notes`,
			type: "textarea",
			value: employeeNotes || "",
			errors: "",
			placeholder:
				"(Optional) Include any special notes for the event above...",
			required: false,
			disabled: false,
			width: "350px",
			minHeight: "125px",
			className: "ap-form-notes",
			maxLength: 200,
			rows: 3,
			style: {
				width: "100%",
				padding: "5px",
			},
			innerStyle: {
				maxWidth: "350px",
				minHeight: "101px",
				marginBottom: "20px",
			},
		};

		return [...acc, radioFields, noteFields];
	}, []);

	return [...result, ...initializedFields];
};
