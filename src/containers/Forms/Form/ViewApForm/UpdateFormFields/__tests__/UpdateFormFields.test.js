import EventLabel from "components/Body/EventLabel";
import updateFormFields from "../index";

const eventsGame = [
	{
		employeeResponse: [
			{
				_id: "5d72dffe65ec39141ae78551",
				response: "I want to work.",
				notes: "I am ready!",
			},
		],
		eventDate: "2019-09-06T16:30:36.000Z",
		eventType: "Game",
		location: "SAP Center at San Jose",
		notes: "This is a note.",
		opponent: "San Diego Gulls",
		team: "San Jose Barracuda",
		_id: "5d72dffe65ec39141ae78562",
	},
];

const eventsPromo = [
	{
		_id: "5d5b5ee857a6d20abf49db1a",
		eventDate: "2019-08-21T02:30:36.000Z",
		eventType: "Promotional",
		employeeResponse: [],
		location: "SAP Center at San Jose",
		notes: "",
		opponent: "",
		team: "San Jose Sharks",
	},
];

describe("UpdateFormFields", () => {
	it("initializes a radiogroup field value, adds a label, adds an updateEvent flag, includes event notes, and enables the field", () => {
		const field = {
			type: "radiogroup",
			value: "",
			errors: "",
			required: true,
			disabled: true,
			selectOptions: [
				"I want to work.",
				"Available to work.",
				"Prefer not to work.",
				"Not available to work.",
			],
		};

		const updatedField = updateFormFields([], field, eventsGame);

		expect(updatedField).toEqual([
			{
				...field,
				id: eventsGame[0]._id,
				name: eventsGame[0]._id,
				value: eventsGame[0].employeeResponse[0].response,
				label: (
					<EventLabel
						eventType={eventsGame[0].eventType}
						eventDate={eventsGame[0].eventDate}
						opponent={eventsGame[0].opponent}
						team={eventsGame[0].team}
					/>
				),
				updateEvent: true,
				notes: eventsGame[0].notes,
				disabled: false,
			},
			{
				id: eventsGame[0]._id,
				name: `${eventsGame[0]._id}-notes`,
				type: "textarea",
				value: eventsGame[0].employeeResponse[0].notes,
				errors: "",
				placeholder:
					"(Optional) Include any special notes for the event above...",
				className: "ap-form-notes",
				required: false,
				disabled: false,
				width: "350px",
				minHeight: "125px",
				maxLength: 200,
				rows: 3,
				style: {
					width: "100%",
					padding: "5px",
				},
				innerStyle: {
					maxWidth: "350px",
					minHeight: "101px",
				},
			},
		]);
	});

	it("updates a radiogroup field value, adds a label, and enables the field", () => {
		const field = {
			type: "radiogroup",
			value: "",
			errors: "",
			required: true,
			disabled: true,
			selectOptions: [
				"I want to work.",
				"Available to work.",
				"Prefer not to work.",
				"Not available to work.",
			],
		};

		const updatedField = updateFormFields([], field, eventsPromo);

		expect(updatedField).toEqual([
			{
				...field,
				id: eventsPromo[0]._id,
				name: eventsPromo[0]._id,
				value: "",
				label: (
					<EventLabel
						eventType={eventsPromo[0].eventType}
						eventDate={eventsPromo[0].eventDate}
						opponent={eventsPromo[0].opponent}
						team={eventsPromo[0].team}
					/>
				),
				updateEvent: false,
				notes: eventsPromo[0].notes,
				disabled: false,
			},
			{
				id: eventsPromo[0]._id,
				name: `${eventsPromo[0]._id}-notes`,
				type: "textarea",
				value: eventsPromo[0].notes,
				errors: "",
				placeholder:
					"(Optional) Include any special notes for the event above...",
				className: "ap-form-notes",
				required: false,
				disabled: false,
				width: "350px",
				minHeight: "125px",
				maxLength: 200,
				rows: 3,
				style: {
					width: "100%",
					padding: "5px",
				},
				innerStyle: {
					maxWidth: "350px",
					minHeight: "101px",
				},
			},
		]);
	});
});
