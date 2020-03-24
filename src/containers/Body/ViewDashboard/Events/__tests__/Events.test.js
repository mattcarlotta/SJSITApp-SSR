import moment from "moment-timezone";
import { Events } from "../index";

const fetchEvents = jest.fn();

const today = Date.now();

const events = [
	{
		_id: "0123456782239",
		eventDate: `${moment
			.utc(today)
			.startOf("day")
			.format()}`,
		eventNotes: "",
		eventType: "Game",
		notes: "",
		opponent: "Anaheim Ducks",
		response: "",
		team: "San Jose Sharks",
		schedule: [
			{
				_id: `${moment()
					.utc(today)
					.startOf("day")
					.format()}`,
				title: "5:50pm",
				employeeIds: [],
			},
		],
	},
	{
		_id: "012345678997158",
		eventDate: `${moment
			.utc(today)
			.add(3, "days")
			.format()}`,
		eventNotes: "",
		eventType: "Game",
		notes: "",
		opponent: "San Diego Gulls",
		response: "",
		team: "San Jose Barracuda",
		schedule: [
			{
				_id: `${moment
					.utc(today)
					.add(3, "days")
					.format()}`,
				title: "5:50pm",
				employeeIds: [],
			},
		],
	},
];

const initProps = {
	events: [],
	isLoading: true,
	fetchEvents,
	loggedinUserId: "88",
	role: "employee",
};

describe("Dashboard Events", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = HOCWrap(Events, initProps);
	});

	afterEach(() => {
		fetchEvents.mockClear();
	});

	it("intially shows a LoadingPanel", () => {
		expect(wrapper.find("LoadingPanel").exists()).toBeTruthy();
		expect(fetchEvents).toHaveBeenCalledWith("Today");
	});

	it("displays NoEvents", () => {
		wrapper.setProps({ isLoading: false });
		expect(wrapper.find("NoEvents").exists()).toBeTruthy();
	});

	it("displays todays event, handles open/closing a modal with event details, and handles selection", () => {
		wrapper.setProps({ events, isLoading: false });
		expect(wrapper.find("Button")).toHaveLength(1);

		wrapper.find("Button").simulate("click");

		expect(wrapper.find("Events").state("isVisible")).toBeTruthy();
		expect(wrapper.find("Events").state("modalChildren")).toEqual([events[0]]);

		wrapper
			.find("#close-modal")
			.first()
			.simulate("click");

		expect(wrapper.find("Events").state("isVisible")).toBeFalsy();
		expect(wrapper.find("Events").state("modalChildren")).toBeNull();

		const selectedEvent = "Upcoming";
		wrapper
			.find("Events")
			.instance()
			.handleSelection(selectedEvent);

		expect(wrapper.find("Events").state("selectedEvent")).toEqual(
			selectedEvent,
		);
		expect(fetchEvents).toHaveBeenCalledWith(selectedEvent);
	});
});
