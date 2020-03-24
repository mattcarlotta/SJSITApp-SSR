import { Settings } from "../index";

const fetchMemberSettingsAvailability = jest.fn();
const fetchMemberSettingsEvents = jest.fn();
const fetchMemberSettings = jest.fn();
const updateMemberStatus = jest.fn();

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
	eventResponses: [],
	fetchMemberSettingsAvailability,
	fetchMemberSettingsEvents,
	fetchMemberSettings,
	match: {
		params: {
			id: "",
		},
	},
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
	updateMemberStatus,
	serverMessage: "",
};

describe("View Settings", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<Settings {...initProps} />);
		wrapper.setState({ windowWidth: 1000 });
	});

	afterEach(() => {
		fetchMemberSettings.mockClear();
	});

	it("initially renders a LoadingPanel", () => {
		wrapper.setProps({ viewMember: {} });
		expect(wrapper.find("LoadingPanel").exists()).toBeTruthy();
	});

	it("initially calls fetchMemberSettings on mount", () => {
		expect(fetchMemberSettings).toHaveBeenCalledTimes(1);
	});

	it("initially renders tabs along the side", () => {
		expect(wrapper.find("Tabs").props().tabPosition).toEqual("left");
	});

	it("renders tabs along the top if the windowWidth is less than 900", () => {
		wrapper.setState({ windowWidth: 800 });
		expect(wrapper.find("Tabs").props().tabPosition).toEqual("top");
	});

	it("renders 3 active tabs if the role is 'employee'", () => {
		wrapper.setProps({ viewMember });
		expect(
			wrapper
				.find("TabPane")
				.at(1)
				.props().disabled,
		).toBeFalsy();
		expect(
			wrapper
				.find("TabPane")
				.at(2)
				.props().disabled,
		).toBeFalsy();
	});

	it("renders 1 active tab if the role is 'staff' or 'admin'", () => {
		wrapper.setProps({ viewMember: staffMember });
		expect(
			wrapper
				.find("TabPane")
				.at(1)
				.props().disabled,
		).toBeTruthy();
		expect(
			wrapper
				.find("TabPane")
				.at(2)
				.props().disabled,
		).toBeTruthy();
	});
});
