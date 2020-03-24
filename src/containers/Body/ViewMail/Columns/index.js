import React from "react";
import DisplaySendToList from "~components/Body/DisplaySendToList";
import EmailStatus from "~components/Body/EmailStatus";
import FormatDate from "~components/Body/FormatDate";

export default [
	{
		title: "Status",
		dataIndex: "status",
		key: "status",
		render: status => <EmailStatus status={status} />,
	},
	{
		title: "Send To",
		dataIndex: "sendTo",
		key: "sendTo",
		render: emails => <DisplaySendToList emails={emails} />,
	},
	{
		title: "Send From",
		dataIndex: "sendFrom",
		key: "sendFrom",
	},
	{
		title: "Send Date",
		dataIndex: "sendDate",
		key: "sendDate",
		render: date => <FormatDate format="MM/DD/YYYY @ hh:mm a" date={date} />,
	},
	{
		title: "Subject",
		dataIndex: "subject",
		key: "subject",
	},
];
