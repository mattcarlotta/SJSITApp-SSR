import React from "react";
import DisplayEmailReminder from "~components/Body/DisplayEmailReminder";
import DisplayScheduledEmployees from "~components/Body/DisplayScheduledEmployees";
import DisplayTime from "~components/Body/DisplayTime";
import DisplayTeam from "~components/Body/DisplayTeam";
import FormatDate from "~components/Body/FormatDate";

export default [
	{ title: "Season Id", dataIndex: "seasonId", key: "seasonId" },
	{
		title: "Team",
		dataIndex: "team",
		key: "team",
		render: team => <DisplayTeam opacity="1" folder="lowres" team={team} />,
	},
	{
		title: "Opponent",
		dataIndex: "opponent",
		key: "opponent",
		render: team =>
			team ? <DisplayTeam opacity="1" folder="lowres" team={team} /> : "-",
	},
	{ title: "Event Type", dataIndex: "eventType", key: "eventType" },
	{ title: "Location", dataIndex: "location", key: "location" },
	{ title: "Uniform", dataIndex: "uniform", key: "uniform" },
	{
		title: "Event Date",
		dataIndex: "eventDate",
		key: "eventDate",
		render: date => (
			<FormatDate
				style={{ wordWrap: "break-word", wordBreak: "break-word", width: 175 }}
				format="MMM Do @ h:mm a"
				date={date}
			/>
		),
	},
	{
		title: "Call Times",
		dataIndex: "callTimes",
		key: "callTimes",
		render: times => <DisplayTime times={times} />,
	},
	{
		title: "Employee Responses",
		dataIndex: "employeeResponses",
		key: "employeeResponses",
		render: responses => <span css="cursor: default;">{responses.length}</span>,
	},
	{
		title: "Scheduled Employees",
		dataIndex: "scheduledIds",
		key: "scheduledIds",
		render: employees => <DisplayScheduledEmployees employees={employees} />,
	},
	{
		title: "Email Reminders",
		dataIndex: "sentEmailReminders",
		key: "sentEmailReminders",
		render: reminder => <DisplayEmailReminder reminder={reminder} />,
	},
];
