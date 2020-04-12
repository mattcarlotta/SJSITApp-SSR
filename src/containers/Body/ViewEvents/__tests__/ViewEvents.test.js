import moment from "moment-timezone";
import { ViewEvents } from "../index";
import { withRouterContext } from "../../../../utils/testing";

const deleteEvent = jest.fn();
const deleteManyEvents = jest.fn();
const fetchEvents = jest.fn();
const resendMail = jest.fn();

const initProps = {
	data: [],
	deleteEvent,
	deleteManyEvents,
	fetchEvents,
	isLoading: true,
	resendMail,
	totalDocs: 0,
	teams: [],
};

const data = [
	{
		_id: "5d4cb97fdfbf3c0416f6148b",
		team: "San Jose Sharks",
		opponent: "Anaheim Ducks",
		eventType: "Game",
		location: "SAP Center at San Jose",
		callTimes: [
			moment("2019-08-09T17:45:26-07:00").format(),
			moment("2019-08-09T18:15:26-07:00").format(),
		],
		uniform: "Teal Jersey",
		seasonId: "20192020",
		eventDate: moment("2019-08-09T02:00:12.074Z").format(),
		employeeResponses: [],
		scheduledIds: [],
		sentEmailReminders: false,
	},
	{
		_id: "5d4cb97fdfbf3c0416f6148c",
		team: "San Jose Sharks",
		opponent: "",
		eventType: "Promotional",
		location: "SAP Center at San Jose",
		callTimes: [
			moment("2019-08-09T17:45:26-07:00").format(),
			moment("2019-08-09T18:15:26-07:00").format(),
		],
		uniform: "Teal Jersey",
		seasonId: "20192020",
		eventDate: moment("2019-08-09T02:00:12.074Z").format(),
		employeeResponses: [],
		scheduledIds: [],
		sentEmailReminders: true,
	},
];

describe("View All Events", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = withRouterContext(ViewEvents, initProps);
	});

	it("renders without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});

	it("renders a LoadingTable", () => {
		expect(wrapper.find("LoadingTable").exists()).toBeTruthy();
	});

	it("renders DisplayTeam, FormatDate, DisplayTime and DisplayEmailReminder", () => {
		wrapper.setProps({ data, isLoading: false, totalDocs: 2 });
		wrapper.update();

		expect(wrapper.find("DisplayTeam").exists()).toBeTruthy();
		expect(wrapper.find("FormatDate").exists()).toBeTruthy();
		expect(wrapper.find("DisplayTime").exists()).toBeTruthy();
		expect(wrapper.find("FaShareSquare").exists()).toBeTruthy();
		expect(wrapper.find("FaStopwatch").exists()).toBeTruthy();
	});
});
