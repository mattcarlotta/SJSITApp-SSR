/* istanbul ignore file */

export default [
	{
		name: "sendTo",
		type: "select",
		label: "Send To",
		placeholder: "Select an option to send a message to...",
		value: "",
		errors: "",
		required: true,
		disabled: false,
		selectOptions: ["Admin", "Staff"],
	},
	{
		name: "subject",
		type: "text",
		label: "Subject",
		placeholder: "The subject of your message...",
		value: "",
		errors: "",
		required: true,
		disabled: false,
	},
	{
		name: "message",
		type: "textarea",
		label: "Message",
		placeholder: "The reason why you're contacting us...",
		value: "",
		errors: "",
		required: true,
		disabled: false,
	},
];
