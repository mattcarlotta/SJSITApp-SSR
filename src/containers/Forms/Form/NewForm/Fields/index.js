/* istanbul ignore file */
import moment from "moment-timezone";

export default [
	{
		name: "seasonId",
		type: "select",
		label: "Season ID",
		placeholder: "Select a season id...",
		icon: "id",
		errors: "",
		value: "",
		required: true,
		disabled: true,
		selectOptions: [],
	},
	{
		type: "range",
		name: "enrollMonth",
		label: "Enrollment Month",
		tooltip:
			"All events within the date ranges specified below will be added to a new AP form.",
		value: [moment().startOf("month"), moment().endOf("month")],
		errors: "",
		required: true,
		disabled: true,
		format: "l",
	},
	{
		type: "date",
		name: "expirationDate",
		label: "Expiration Date",
		placeholder: "Select a start date and time...",
		tooltip:
			"After the date specified below, employee responses will no longer be accepted nor editable.",
		value: null,
		errors: "",
		required: true,
		disabled: true,
		format: "MM/DD/YYYY h:mm a",
		showTime: { format: "h:mm a", use12Hours: true },
		style: { width: "100%" },
	},
	{
		type: "date",
		name: "sendEmailNotificationsDate",
		label: "Send Email Notifications Date",
		placeholder: "Select a start date and time...",
		tooltip:
			"Specify a date to send out email notifications. If left empty, emails will be sent out immediately.",
		value: null,
		errors: "",
		required: false,
		disabled: true,
		format: "MM/DD/YYYY",
		showTime: { use12Hours: true },
		style: { width: "100%" },
	},
	{
		name: "notes",
		type: "textarea",
		label: "Notes",
		tooltip:
			"Any notes provided below will be added to the A/P form email notifications.",
		placeholder: "(Optional) Include any special notes to add to the form...",
		value: "",
		errors: "",
		required: false,
		disabled: true,
	},
];
