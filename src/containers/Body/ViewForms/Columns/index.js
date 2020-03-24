import React from "react";
import DisplayEmailReminder from "~components/Body/DisplayEmailReminder";
import FormatDate from "~components/Body/FormatDate";

export default [
	{ title: "Season Id", dataIndex: "seasonId", key: "seasonId" },
	{
		title: "Start Month",
		dataIndex: "startMonth",
		key: "startMonth",
		render: date => <FormatDate format="MM/DD/YYYY" date={date} />,
	},
	{
		title: "End Month",
		dataIndex: "endMonth",
		key: "endMonth",
		render: date => <FormatDate format="MM/DD/YYYY" date={date} />,
	},
	{
		title: "Expiration Date",
		dataIndex: "expirationDate",
		key: "expirationDate",
		render: date => <FormatDate format="MM/DD/YY @ hh:mm a" date={date} />,
	},
	{
		title: "Form Id",
		dataIndex: "_id",
		key: "_id",
	},
	{
		title: "Send Email Notifications",
		dataIndex: "sendEmailNotificationsDate",
		key: "sendEmailNotificationsDate",
		render: date => <FormatDate format="MMMM Do, YYYY" date={date} />,
	},
	{
		title: "Email Notifications",
		dataIndex: "sentEmails",
		key: "sentEmails",
		render: reminder => <DisplayEmailReminder reminder={reminder} />,
	},
];
