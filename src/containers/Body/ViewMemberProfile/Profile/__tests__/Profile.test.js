// import moment from "~utils/momentWithTZ";
import Profile from "../index";

const deleteMemberAvatar = jest.fn();
const updateMemberAvatar = jest.fn();
const updateMemberStatus = jest.fn();

const viewMember = {
	_id: "0123456789",
	avatar: "",
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
	deleteMemberAvatar,
	isCollapsed: false,
	updateMemberAvatar,
	updateMemberStatus,
	viewMember,
};

describe("Member Profile", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = withRouterContext(Profile, initProps);
	});

	afterEach(() => {
		deleteMemberAvatar.mockClear();
		updateMemberStatus.mockClear();
	});

	it("renders without errors", () => {
		expect(wrapper.find("PaneBody").exists()).toBeTruthy();
	});

	it("changes flex direction when collapsed", () => {
		wrapper.setProps({ isCollapsed: true });
		expect(wrapper.find("Flex").props().direction).toEqual("column");
	});

	it("calls deleteAvatar", () => {
		wrapper.setProps({
			viewMember: { ...initProps.viewMember, avatar: "123.png" },
		});

		wrapper.find("Button#delete-avatar").first().simulate("click");

		expect(deleteMemberAvatar).toHaveBeenCalledWith(viewMember._id);
	});

	it("displays the member's status, as well as a activate/suspend button", () => {
		let statusButton = () =>
			wrapper.find("Button#change-member-status").first();

		// active status
		expect(statusButton().props().primary).toBeFalsy();
		expect(statusButton().props().danger).toBeTruthy();
		expect(statusButton().find("FaBan").exists()).toBeTruthy();
		expect(statusButton().text()).toContain("Suspend");

		// inactive status
		wrapper.setProps({ viewMember: { ...inactiveMember } });
		expect(statusButton().props().primary).toBeTruthy();
		expect(statusButton().props().danger).toBeFalsy();
		expect(statusButton().text()).toContain("Activate");
	});

	it("calls updateMemberStatus when the button is clicked", () => {
		wrapper.find("Button#change-member-status").first().simulate("click");

		expect(updateMemberStatus).toHaveBeenCalledWith({
			_id: viewMember._id,
			status: viewMember.status,
		});
	});
});
