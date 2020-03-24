import React from "react";
import FormatDate from "~components/Body/FormatDate";
import TokenStatus from "~components/Body/TokenStatus";

export default [
	{
		title: "Registration Status",
		dataIndex: "email",
		key: "email",
		render: email => <TokenStatus email={email} />,
	},
	{
		title: "Authorized Email",
		dataIndex: "authorizedEmail",
		key: "authorizedEmail",
	},
	{ title: "Role", dataIndex: "role", key: "role" },
	{
		title: "Authorization Key",
		dataIndex: "token",
		key: "token",
		render: token => (
			<div css="width: 400px; overflow-x: auto; margin: 0 auto;">{token}</div>
		),
	},
	{
		title: "Expiration Date",
		dataIndex: "expiration",
		key: "expiration",
		render: (date, { email }) =>
			!email ? <FormatDate format="MM/DD/YYYY" date={date} /> : <span>-</span>,
	},
];
