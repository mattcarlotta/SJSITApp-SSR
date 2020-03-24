import EventLabel from "../index";

const initProps = {
	eventType: "Game",
	eventDate: "2019-08-21T02:30:36.000Z",
	opponent: "Los Angeles Kings",
	team: "San Jose Sharks",
};

const nextProps = {
	eventType: "Promotional",
	eventDate: "2019-08-21T02:30:36.000Z",
	opponent: "",
	team: "San Jose Sharks",
};

describe("Event Label", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<EventLabel {...initProps} />);
	});

	it("displays a EventLabel with two teams", () => {
		expect(wrapper.find("EventLabel").exists()).toBeTruthy();
		expect(wrapper.find("FormatDate").exists()).toBeTruthy();
		expect(wrapper.find("DisplayTeam")).toHaveLength(2);
		expect(wrapper.find("EventLabel").text()).toContain(
			`(${initProps.eventType})`,
		);
	});

	it("displays a EventLabel with one team", () => {
		wrapper.setProps({ ...nextProps });
		expect(wrapper.find("EventLabel").exists()).toBeTruthy();
		expect(wrapper.find("FormatDate").exists()).toBeTruthy();
		expect(wrapper.find("DisplayTeam")).toHaveLength(1);
		expect(wrapper.find("EventLabel").text()).toContain(
			`(${nextProps.eventType})`,
		);
	});
});
