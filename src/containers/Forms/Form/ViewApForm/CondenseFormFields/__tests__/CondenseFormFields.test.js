import condenseFormFields from "../index";

const eventField1 = {
	disabled: false,
	errors: "",
	id: "5d5b5ee857a6d20abf49db19",
	label: "",
	name: "5d5b5ee857a6d20abf49db19",
	notes: "",
	required: false,
	selectOptions: [
		"I want to work.",
		"Available to work.",
		"Prefer not to work.",
		"Not available to work.",
	],
	type: "radiogroup",
	updateEvent: true,
	value: "Not available to work.",
};

const eventNote1 = {
	id: "5d5b5ee857a6d20abf49db19",
	type: "textarea",
	value: "Out of town.",
};

const eventField2 = {
	disabled: false,
	errors: "",
	id: "5d5dc7c28b96ca09a35c872c",
	label: "",
	name: "5d5dc7c28b96ca09a35c872c",
	notes: "",
	required: false,
	selectOptions: [
		"I want to work.",
		"Available to work.",
		"Prefer not to work.",
		"Not available to work.",
	],
	type: "radiogroup",
	updateEvent: true,
	value: "Available to work.",
};

const eventNote2 = {
	id: "5d5dc7c28b96ca09a35c872c",
	type: "textarea",
	value: "Out of town.",
};

describe("Condense Form Fields", () => {
	it("condenses event notes", () => {
		const formFields = [
			{ ...eventField1 },
			{ ...eventNote1 },
			{ ...eventField2 },
			{ ...eventNote2 },
		];

		const updatedFields = condenseFormFields(formFields);
		expect(updatedFields).toEqual([
			{
				...eventField1,
				notes: eventNote1.value,
			},
			{ ...eventField2, notes: eventNote2.value },
		]);
	});
});
