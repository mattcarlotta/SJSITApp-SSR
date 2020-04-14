import { Settings } from "../index";

const deleteUserAvatar = jest.fn();
const fetchMemberSettingsAvailability = jest.fn();
const fetchMemberSettingsEvents = jest.fn();
const updateMemberStatus = jest.fn();
const updateUserAvatar = jest.fn();

const viewMember = {
	email: "test@example.com",
	firstName: "Beta",
	lastName: "Tester",
	registered: "2019-09-13T16:44:27.649Z",
	role: "employee",
	status: "active",
	_id: "5d7bc76cb91acc3a5744c3cd",
};

const staffMember = {
	...viewMember,
	role: "staff",
};

const initProps = {
	deleteUserAvatar,
	eventResponses: [],
	fetchMemberSettingsAvailability,
	fetchMemberSettingsEvents,
	memberAvailability: {},
	viewMember: {
		_id: "10393489438",
		email: "test@test.com",
		firstName: "Bob",
		lastName: "Smith",
		registered: "2019-11-01T07:00:00.000+00:00",
		role: "employee",
		schedule: [],
		status: "active",
	},
	serverMessage: "",
	updateMemberStatus,
	updateUserAvatar,
};

const eventListener = {};
window.addEventListener = (evt, cb) => (eventListener[evt] = cb);
window.removeEventListener = jest.fn();

describe("View Settings", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<Settings {...initProps} />);
		wrapper.setState({ windowWidth: 1000 });
	});

	afterEach(() => {
		fetchMemberSettingsEvents.mockClear();
		window.removeEventListener.mockClear();
	});

	it("initially renders a LoadingPanel", () => {
		wrapper.setProps({ viewMember: {} });
		expect(wrapper.find("LoadingPanel").exists()).toBeTruthy();
	});

	it("calls removeEventListener on unmount", () => {
		wrapper.unmount();
		expect(window.removeEventListener).toHaveBeenCalledTimes(1);
	});

	it("handles fetching initial response data", () => {
		wrapper.instance().handleFetchEventResponseInitialData();

		expect(fetchMemberSettingsEvents).toHaveBeenCalledWith({
			id: initProps.viewMember._id,
		});
	});

	it("initially renders tabs along the side", () => {
		expect(wrapper.find("Tabs").props().tabPosition).toEqual("left");
	});

	it("renders tabs along the top if the windowWidth is less than 900", () => {
		wrapper.setState({ isCollapsed: true });
		expect(wrapper.find("Tabs").props().tabPosition).toEqual("top");
	});

	it("renders 3 active tabs if the role is 'employee'", () => {
		wrapper.setProps({ viewMember });
		expect(wrapper.find("TabPane").at(1).props().disabled).toBeFalsy();
		expect(wrapper.find("TabPane").at(2).props().disabled).toBeFalsy();
	});

	it("renders 1 active tab if the role is 'staff' or 'admin'", () => {
		wrapper.setProps({ viewMember: staffMember });
		expect(wrapper.find("TabPane").at(1).props().disabled).toBeTruthy();
		expect(wrapper.find("TabPane").at(2).props().disabled).toBeTruthy();
	});
});
