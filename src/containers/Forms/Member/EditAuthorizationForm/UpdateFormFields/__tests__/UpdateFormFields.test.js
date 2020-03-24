import updateFormFields from "../index";

const editToken = {
	_id: "5d44a68188524202892bd82e",
	email: "",
	authorizedEmail: "member@example.com",
	role: "member",
	seasonId: "20002001",
	token: "Iy7bjX0jMAfmfrRFtXWC79urQ2mJeLrC",
	expiration: "2019-11-01T06:59:59.999Z",
};

describe("UpdateFormFields", () => {
	it("updates role field value and enables the field", () => {
		const roleField = {
			name: "role",
			type: "select",
			label: "Role",
			placeholder: "Select a role...",
			icon: "usertag",
			value: "",
			errors: "",
			required: true,
			disabled: true,
			selectOptions: ["staff", "employee"],
		};

		const updatedField = updateFormFields(roleField, editToken);

		expect(updatedField).toEqual({
			...roleField,
			value: editToken.role,
			disabled: !!editToken.email,
		});
	});

	it("updates authorizedEmail field value and enables the field", () => {
		const authorizedEmailField = {
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
			disabled: true,
		};

		const updatedField = updateFormFields(authorizedEmailField, editToken);

		expect(updatedField).toEqual({
			...authorizedEmailField,
			value: editToken.authorizedEmail,
			disabled: false,
		});
	});
});
