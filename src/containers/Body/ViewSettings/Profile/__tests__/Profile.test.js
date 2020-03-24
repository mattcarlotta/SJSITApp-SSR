import moment from "moment-timezone";
import Profile from "../index";

const initProps = {
	firstName: "Beta",
	lastName: "Tester",
	registered: "2019-07-26T16:56:40.518+00:00",
	role: "member",
	status: "active",
};

describe("Profile", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<Profile {...initProps} />);
	});

	it("renders without errors", () => {
		expect(wrapper.find("PaneBody").exists()).toBeTruthy();
	});

	it("displays a Title with the member's name", () => {
		expect(wrapper.find("Title").text()).toContain(
			`${initProps.firstName} ${initProps.lastName}`,
		);
	});

	it("displays the member's id", () => {
		expect(
			wrapper
				.find("LightText")
				.first()
				.text(),
		).toContain(initProps.status);
	});

	it("displays the member's registration date", () => {
		expect(
			wrapper
				.find("LightText")
				.at(1)
				.text(),
		).toContain(`${moment(initProps.registered).format("MMMM Do, YYYY")}`);
	});

	it("displays the member's role", () => {
		expect(
			wrapper
				.find("LightText")
				.at(2)
				.text(),
		).toContain(initProps.role);
	});
});
