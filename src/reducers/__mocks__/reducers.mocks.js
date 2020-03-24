export const userSession = {
	id: "88",
	email: "test@example.com",
	firstName: "Beta",
	lastName: "Tester",
	role: "staff",
};

export const teams = ["sharks", "barracuda"];

export const serverMessage = {
	type: "success",
	show: true,
	message: "Welcome to the team!",
};

export const seasonsData = [
	{
		_id: "5d323ee2b02dee15483e5d9f",
		members: 3,
		seasonId: "20002001",
		startDate: "2000-10-06T07:00:00.000+00:00",
		endDate: "2001-08-06T07:00:00.000+00:00",
	},
];

export const mailData = [
	{
		_id: "5d54769658ae8d57e19a1ecc",
		seasonId: "20192020",
		seasonIds: ["20192020", "20202021", "20212022"],
		startMonth: "2019-08-01T07:00:00.000Z",
		endMonth: "2019-09-01T06:59:59.000Z",
		expirationDate: "2019-08-08T06:59:00.000Z",
		notes: "Hello",
		sendEmailNotificationsDate: "2019-08-08T06:59:00.000Z",
	},
];

export const membersData = [
	{
		_id: "1234567890",
		firstName: "Beta",
		lastName: "Tester",
		role: "employee",
		email: "member@example.com",
		registered: "2000-10-06T07:00:00.000+00:00",
		events: 0,
	},
];

export const memberEventResponses = [
	{
		_id: "5d978f2a27ee7b45b3319a7a",
		team: "San Jose Sharks",
		opponent: "Vegas Golden Knights",
		eventDate: "2019-10-08T02:30:21.000Z",
		eventType: "Game",
		eventNotes: "Traffic will be heavy due to a downtown event. Leave early!",
		location: "SAP Center at San Jose",
		employeeResponse: "Not available to work.",
		employeeNotes: "Working another job.",
	},
];

export const memberAvailability = {
	memberResponseCount: [
		{
			id: "I want to work.",
			label: "I want to work.",
			color: "#247BA0",
			value: 0,
		},
		{
			id: "Available to work.",
			label: "Available to work.",
			color: "#2A9D8F",
			value: 1,
		},
		{
			id: "Prefer not to work.",
			label: "Prefer not to work.",
			color: "#F4A261",
			value: 1,
		},
		{
			id: "Not available to work.",
			label: "Not available to work.",
			color: "#FF8060",
			value: 2,
		},
		{
			id: "No response.",
			label: "No response.",
			color: "#BFBFBF",
			value: 0,
		},
	],
	memberScheduleEvents: [
		{
			id: "scheduled",
			events: 2,
		},
		{
			id: "available",
			events: 4,
		},
	],
};

export const tokensData = [
	{
		_id: "1234567890",
		authorizedEmail: "beta@tester.com",
		email: "beta@tester.com",
		expiration: "2000-10-06T07:00:00.000+00:00",
		seasonId: "20002001",
		role: "employee",
		token: "0123456789",
	},
];

export const seasonIdsData = ["20002001", "20012002", "20022003"];

export const eventsData = [
	{
		_id: "0123456789",
		callTimes: ["2019-08-09T19:00:38-07:00"],
		eventDate: "2019-08-11T02:30:30.036+00:00",
		eventType: "Game",
		team: "San Jose Sharks",
		opponent: "Anaheim Ducks",
		location: "SAP Center at San Jose",
		notes: "",
		seasonId: "20002001",
		uniform: "Barracuda Jersey",
		employeeResponse: {
			_id: "0123456789",
			notes: "I'm gone all month.",
			response: "Prefer not to work.",
		},
	},
];

export const eventDistribution = [
	{
		name: "Matthew Carlotta",
		"Event Count": 1,
	},
	{
		name: "Bob Dole",
		"Event Count": 1,
	},
];

export const formData = [
	{
		_id: "0123456789",
		seasonId: "20192020",
		startMonth: "2019-08-01T07:00:00.000Z",
		endMonth: "2019-09-01T06:59:59.000Z",
		expirationDate: "2019-08-08T06:59:00.000Z",
		notes: "Test",
	},
];

export const eventsApData = [
	{
		_id: "0123456789",
		eventDate: "2019-08-21T02:30:36.000Z",
		eventType: "Game",
		location: "SAP Center at San Jose",
		notes: "",
		opponent: "Vegas Golden Knights",
		team: "San Jose Sharks",
	},
];

export const scheduleEventsData = [
	{
		_id: "5d72dffe65ec39141ae78562",
		eventDate: "2019-09-06T16:30:36.000Z",
		eventType: "Game",
		location: "SAP Center at San Jose",
		notes: "",
		opponent: "San Diego Gulls",
		schedule: [],
		scheduledIds: [
			"5d72dffe65ec39141ae78553",
			"5d72dffe65ec39141ae78554",
			"5d72dffe65ec39141ae78555",
			"5d72dffe65ec39141ae78558",
			"5d72dffe65ec39141ae78559",
			"5d72dffe65ec39141ae7855a",
			"5d72dffe65ec39141ae7855b",
		],
		team: "San Jose Barracuda",
		uniform: "Barracuda Jacket",
	},
];

export const memberNamesData = [
	{
		_id: "5d83d5b32bff0853d6539cb6",
		email: "Bobby Axelrod <member10@example.com>",
	},
];

export const membersAvailability = [
	{
		id: "Matthew Carlotta",
		availability: 72,
	},
	{
		id: "Bob Dole",
		availability: 66,
	},
];

export const eventForSchedulingData = {
	columns: [
		{ _id: "employees", title: "Employees", employeeIds: [] },
		{ _id: "2019-10-31T17:15:43-07:00", title: "05:15 pm", employeeIds: [] },
	],
	event: {
		_id: "5d72dffe65ec39141ae78561",
		callTimes: ["2019-10-31T17:15:43-07:00"],
		employeeResponses: [],
		eventDate: "2019-10-31T02:30:36.000Z",
		eventType: "Game",
		location: "SAP Center at San Jose",
		notes: "",
		opponent: "Arizona Coyotes",
		schedule: [
			{
				_id: "2019-10-31T17:15:43-07:00",
				employeeIds: [],
				title: "05:15 pm",
			},
		],
		scheduledIds: [],
		seasonId: "20192020",
		team: "San Jose Sharks",
		uniform: "Sharks Teal Jersey",
	},
	users: [
		{
			_id: "5d72dffe65ec39141ae78553",
			firstName: "Member",
			lastName: "Member",
			response: "No response.",
			notes: "",
		},
		{
			_id: "5d72dffe65ec39141ae78554",
			firstName: "Member2",
			lastName: "Member2",
			response: "No response.",
			notes: "",
		},
		{
			_id: "5d72dffe65ec39141ae78555",
			firstName: "Member3",
			lastName: "Member3",
			response: "No response.",
			notes: "",
		},
	],
};
