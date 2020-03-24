import { ViewMemberProfile } from "../index";

const fetchMember = jest.fn();
const fetchMemberEvents = jest.fn();
const hideServerMessage = jest.fn();
const fetchScheduleEvents = jest.fn();
const fetchMemberAvailability = jest.fn();
const goBack = jest.fn();
const resetMembers = jest.fn();
const updateMemberStatus = jest.fn();

const initProps = {
	eventResponses: [],
	fetchMember,
	fetchMemberAvailability,
	fetchMemberEvents,
	fetchScheduleEvents,
	hideServerMessage,
	match: {
		params: {
			id: "0123456789",
		},
	},
	goBack,
	resetMembers,
	viewMember: {},
	updateMemberStatus,
	serverMessage: "This is a server message.",
	scheduleEvents: [],
};

const viewMember = {
	_id: "0123456789",
	email: "member@example.com",
	firstName: "Member",
	lastName: "Member",
	registered: "2019-07-26T16:56:40.518+00:00",
	role: "member",
	schedule: [],
	status: "active",
};

describe("View Member Profile", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<ViewMemberProfile {...initProps} />);
	});

	afterEach(() => {
		hideServerMessage.mockClear();
		goBack.mockClear();
		resetMembers.mockClear();
		fetchMember.mockClear();
	});

	it("initially renders a LoadingPanel", () => {
		expect(wrapper.find("LoadingPanel").exists()).toBeTruthy();
	});

	it("calls resetMembers on unmount", () => {
		wrapper.unmount();
		expect(resetMembers).toHaveBeenCalledTimes(1);
	});

	it("initially calls fetchMember on mount", () => {
		expect(fetchMember).toHaveBeenCalledTimes(1);
	});

	it("initially calls hideServerMessage on mount if 'serverMessage' is present", () => {
		expect(hideServerMessage).toHaveBeenCalledTimes(1);
	});

	it("doesn't call hideServerMessage on mount if 'serverMessage' is absent", () => {
		hideServerMessage.mockClear();
		wrapper.setProps({ serverMessage: "" });

		wrapper.instance().componentDidMount();

		expect(hideServerMessage).toHaveBeenCalledTimes(0);
	});

	it("renders 4 tabs when a member has been loaded", () => {
		wrapper.setProps({ viewMember });

		expect(wrapper.find("TabPane")).toHaveLength(4);
	});
});
