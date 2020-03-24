import Schedule from "../index";

const columns = [
	{
		_id: "employees",
		title: "Employees",
		employeeIds: [
			"5d72dffe65ec39141ae78553",
			"5d72dffe65ec39141ae78554",
			"5d72dffe65ec39141ae78555",
		],
	},
	{ _id: "2019-10-31T17:15:43-07:00", title: "05:15 pm", employeeIds: [] },
];

const event = {
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
};

const users = [
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
];

const handleDrag = jest.fn();

const initProps = {
	handleDrag,
	event,
	columns,
	users,
};

const wrapper = shallow(<Schedule {...initProps} />);
describe("Schedule", () => {
	it("renders without errors", () => {
		expect(wrapper.find("ScheduleContainer").exists()).toBeTruthy();
	});
});
