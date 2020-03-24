import moment from "moment-timezone";
import updateFormFields from "../index";

const onFieldRemove = jest.fn();

const editEvent = {
	_id: "5d4e00bcf2d83c45a863e2bc",
	seasonIds: ["20002001"],
	team: "San Jose Sharks",
	opponent: "Anaheim Ducks",
	teams: ["Anaheim Ducks"],
	eventType: "Game",
	location: "SAP Center at San Jose",
	callTimes: [
		"2019-08-09T17:45:26-07:00",
		"2019-08-11T18:15:33-07:00",
		"2019-08-11T18:30:33-07:00",
		"2019-08-11T19:00:33-07:00",
	],
	uniform: "Sharks Teal Jersey",
	seasonId: "20192020",
	eventDate: "2019-08-10T02:30:31.834Z",
	notes: "",
};

describe("UpdateFormFields", () => {
	it("updates seasonIds field value, initialize selectOptions with seasonIds, and enables the field", () => {
		const field = {
			name: "seasonId",
			type: "select",
			label: "Season ID",
			placeholder: "Select a season id...",
			icon: "id",
			value: "",
			errors: "",
			required: true,
			disabled: true,
			selectOptions: [],
		};

		const updatedField = updateFormFields([], field, editEvent, onFieldRemove);

		expect(updatedField).toEqual([
			{
				...field,
				selectOptions: editEvent.seasonIds,
				value: editEvent.seasonId,
				disabled: false,
			},
		]);
	});

	it("updates team field value and enables the field", () => {
		const field = {
			name: "team",
			type: "select",
			label: "Team",
			placeholder: "Select a team...",
			icon: "puck",
			value: "San Jose Sharks",
			errors: "",
			required: true,
			disabled: true,
			selectOptions: ["San Jose Sharks", "San Jose Barracuda"],
		};

		const updatedField = updateFormFields([], field, editEvent, onFieldRemove);

		expect(updatedField).toEqual([
			{
				...field,
				value: editEvent.team,
				disabled: false,
			},
		]);
	});

	it("updates opponent field value and enables the field", () => {
		const field = {
			name: "opponent",
			type: "select",
			label: "Opponent",
			placeholder: "Select an opponent...",
			icon: "puck",
			value: "",
			errors: "",
			required: false,
			disabled: true,
			selectOptions: ["Anaheim Ducks"],
		};

		const updatedField = updateFormFields([], field, editEvent, onFieldRemove);

		expect(updatedField).toEqual([
			{
				...field,
				value: editEvent.opponent,
				disabled: false,
			},
		]);
	});

	it("updates eventType field value and enables the field", () => {
		const field = {
			name: "eventType",
			type: "select",
			label: "Event Type",
			placeholder: "Select a league...",
			icon: "calander",
			value: "Game",
			errors: "",
			required: true,
			disabled: true,
			selectOptions: ["Game", "Promotional", "Other"],
		};

		const updatedField = updateFormFields([], field, editEvent, onFieldRemove);

		expect(updatedField).toEqual([
			{
				...field,
				value: editEvent.eventType,
				disabled: false,
			},
		]);
	});

	it("updates location field value and enables the field", () => {
		const field = {
			name: "location",
			type: "text",
			label: "Event Location",
			icon: "location",
			value: "SAP Center at San Jose",
			errors: "",
			placeholder: "Enter an event location...",
			required: true,
			disabled: true,
		};

		const updatedField = updateFormFields([], field, editEvent, onFieldRemove);

		expect(updatedField).toEqual([
			{
				...field,
				value: editEvent.location,
				disabled: false,
			},
		]);
	});

	it("updates eventDate field value and enables the field", () => {
		const field = {
			type: "date",
			name: "eventDate",
			label: "Event Date",
			placeholder: "Select a start date and time...",
			value: null,
			errors: "",
			required: true,
			format: "MM/DD/YYYY h:mm a",
			showTime: { format: "h:mm a", use12Hours: true, minuteStep: 15 },
			style: { width: "100%" },
		};

		const updatedField = updateFormFields([], field, editEvent, onFieldRemove);

		expect(updatedField).toEqual([
			{
				...field,
				value: moment(editEvent.eventDate),
				disabled: false,
			},
		]);
	});

	it("updates uniform field value and enables the field", () => {
		const field = {
			name: "uniform",
			type: "select",
			label: "Event Attire",
			placeholder: "Select a uniform...",
			icon: "tshirt",
			value: "",
			errors: "",
			required: true,
			disabled: true,
			selectOptions: [
				"Sharks Teal Jersey",
				"Sharks Black Jersey",
				"Sharks Jacket",
				"Barracuda Jacket",
				"Other",
			],
		};

		const updatedField = updateFormFields([], field, editEvent, onFieldRemove);

		expect(updatedField).toEqual([
			{
				...field,
				value: editEvent.uniform,
				disabled: false,
			},
		]);
	});

	it("updates notes field value and enables the field", () => {
		const field = {
			name: "notes",
			type: "textarea",
			label: "Event Notes",
			value: "",
			errors: "",
			placeholder: "(Optional) Include any special event notes...",
			required: false,
			disabled: true,
		};

		const updatedField = updateFormFields([], field, editEvent, onFieldRemove);

		expect(updatedField).toEqual([
			{
				...field,
				value: editEvent.notes,
				disabled: false,
			},
		]);
	});

	it("updates callTime field value and enables the field", () => {
		const field = {
			type: "time",
			name: "callTime",
			label: "Scheduling Call Times",
			placeholder: "Select a call time...",
			tooltip:
				"WARNING - Changing any of the call times below will reset the schedule for this event.",
			value: null,
			errors: "",
			required: true,
			style: { width: "100%" },
		};

		const updatedField = updateFormFields([], field, editEvent, onFieldRemove);

		expect(updatedField).toEqual([
			{
				...field,
				value: moment(editEvent.callTimes[0]),
				disabled: false,
				height: false,
				onFieldRemove: null,
			},
			{
				...field,
				name: `callTime-${editEvent.callTimes[1]}`,
				label: "",
				value: moment(editEvent.callTimes[1]),
				required: false,
				disabled: false,
				height: "auto",
				onFieldRemove,
			},
			{
				...field,
				name: `callTime-${editEvent.callTimes[2]}`,
				label: "",
				value: moment(editEvent.callTimes[2]),
				required: false,
				disabled: false,
				height: "auto",
				onFieldRemove,
			},
			{
				...field,
				name: `callTime-${editEvent.callTimes[3]}`,
				label: "",
				value: moment(editEvent.callTimes[3]),
				required: false,
				disabled: false,
				height: "auto",
				onFieldRemove,
			},
		]);
	});
});
