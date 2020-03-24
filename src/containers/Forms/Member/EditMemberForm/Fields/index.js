/* istanbul ignore file */
export default [
	{
		name: "emailReminders",
		type: "switch",
		label: "Email Reminders",
		value: true,
		tooltip:
			"This setting only affects scheduled events and A/P form email reminders. Monthly schedules will remain unaffected.",
	},
	{
		name: "email",
		type: "email",
		label: "Authorized Email",
		icon: "mail",
		value: "",
		errors: "",
		required: true,
	},
	{
		name: "firstName",
		type: "text",
		label: "First Name",
		icon: "user",
		value: "",
		errors: "",
		required: true,
	},
	{
		name: "lastName",
		type: "text",
		label: "Last Name",
		icon: "user",
		value: "",
		errors: "",
		required: true,
	},
	{
		name: "role",
		type: "select",
		label: "Role",
		placeholder: "Select an option...",
		icon: "usertag",
		value: "",
		errors: "",
		required: true,
		selectOptions: ["staff", "employee"],
	},
];
