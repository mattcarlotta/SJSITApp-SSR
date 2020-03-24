import React from "react";
import FormatDate from "~components/Body/FormatDate";

export default [
	{ title: "Season Id", dataIndex: "seasonId", key: "seasonId" },
	{
		title: "Start Date",
		dataIndex: "startDate",
		key: "startDate",
		render: date => (
			<FormatDate
				format="MM/DD/YYYY"
				style={{ padding: 0, margin: 0 }}
				date={date}
			/>
		),
	},
	{
		title: "End Date",
		dataIndex: "endDate",
		key: "endDate",
		render: date => (
			<FormatDate
				format="MM/DD/YYYY"
				style={{ padding: 0, margin: 0 }}
				date={date}
			/>
		),
	},
];
