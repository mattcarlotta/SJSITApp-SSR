import moment from "moment-timezone";
import Profile from "../index";

const push = jest.fn();
const updateMemberStatus = jest.fn();

const viewMember = {
	_id: "0123456789",
	email: "member@example.com",
	events: [],
	firstName: "Beta",
	lastName: "Tester",
	registered: "2019-07-26T16:56:40.518+00:00",
	role: "member",
	schedule: [],
	status: "active",
};

const inactiveMember = {
	...viewMember,
	status: "suspended",
};

const initProps = {
	push,
	viewMember,
	updateMemberStatus,
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
			`${viewMember.firstName} ${viewMember.lastName}`,
		);
	});

	it("displays the member's id", () => {
		expect(
			wrapper
				.find("LightText")
				.first()
				.text(),
		).toContain(viewMember._id);
	});

	it("displays the member's status, as well as a activate/suspend button", () => {
		let statusButton = wrapper.find("Button");

		// active status
		expect(statusButton.props().primary).toBeFalsy();
		expect(statusButton.props().danger).toBeTruthy();
		expect(statusButton.find("FaBan").exists()).toBeTruthy();
		expect(statusButton.text()).toContain("Suspend");

		// inactive status
		wrapper.setProps({ viewMember: { ...inactiveMember } });

		statusButton = wrapper.find("Button");

		expect(statusButton.props().primary).toBeTruthy();
		expect(statusButton.props().danger).toBeFalsy();
		expect(statusButton.text()).toContain("Activate");
	});

	it("calls updateMemberStatus when the button is clicked", () => {
		wrapper.find("Button").simulate("click");

		expect(updateMemberStatus).toHaveBeenCalledTimes(1);
	});

	it("displays the member's registration date", () => {
		expect(
			wrapper
				.find("LightText")
				.at(2)
				.text(),
		).toContain(`${moment(viewMember.registered).format("MMMM Do, YYYY")}`);
	});

	it("displays the EditMemberForm", () => {
		expect(wrapper.find("Connect(EditMemberForm)").exists()).toBeTruthy();
	});
});
