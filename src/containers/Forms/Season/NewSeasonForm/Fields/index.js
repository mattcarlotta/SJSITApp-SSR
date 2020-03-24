/* istanbul ignore file */

export default [
	{
		type: "text",
		name: "seasonId",
		label: "Season ID",
		tooltip:
			"Select a start and end date below to automatically fill in this field.",
		icon: "id",
		value: "",
		errors: "",
		required: true,
		disabled: true,
		readOnly: true,
		inputStyle: { paddingLeft: 94 },
	},
	{
		type: "range",
		name: "seasonDuration",
		label: "Season Duration",
		value: [],
		errors: "",
		required: true,
		format: "l",
		autoFocus: true,
	},
];
