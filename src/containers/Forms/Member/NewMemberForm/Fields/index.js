/* istanbul ignore file */

export default [
	{
		name: "role",
		type: "select",
		label: "Role",
		placeholder: "Select a role...",
		icon: "usertag",
		value: "",
		errors: "",
		required: true,
		disabled: false,
		selectOptions: ["staff", "employee"],
	},
	{
		name: "authorizedEmail",
		type: "email",
		label: "Authorized Email",
		tooltip:
			"The email provided below will be used to authenticate new members. Please make sure it is valid.",
		placeholder: "Enter an email to authorize...",
		icon: "mail",
		value: "",
		errors: "",
		required: true,
		disabled: false,
	},
];
