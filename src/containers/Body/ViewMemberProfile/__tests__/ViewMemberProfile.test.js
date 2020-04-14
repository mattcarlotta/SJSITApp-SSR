import { ViewMemberProfile } from "../index";

const deleteMemberAvatar = jest.fn();
const fetchMember = jest.fn();
const fetchMemberEvents = jest.fn();
const resetServerMessage = jest.fn();
const fetchScheduleEvents = jest.fn();
const fetchMemberAvailability = jest.fn();
const resetMembers = jest.fn();
const updateMemberAvatar = jest.fn();
const updateMemberStatus = jest.fn();

const initProps = {
	deleteMemberAvatar,
	eventResponses: [],
	fetchMember,
	fetchMemberAvailability,
	fetchMemberEvents,
	fetchScheduleEvents,
	resetServerMessage,
	resetMembers,
	viewMember: {},
	updateMemberStatus,
	serverMessage: "This is a server message.",
	scheduleEvents: [],
	updateMemberAvatar,
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

const eventListener = {};
window.addEventListener = (evt, cb) => (eventListener[evt] = cb);
window.removeEventListener = jest.fn();

describe("View Member Profile", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<ViewMemberProfile {...initProps} />);
	});

	afterEach(() => {
		resetServerMessage.mockClear();
		resetMembers.mockClear();
		fetchMember.mockClear();
		fetchMemberEvents.mockClear();
		window.removeEventListener.mockClear();
	});

	it("initially renders a LoadingPanel", () => {
		expect(wrapper.find("LoadingPanel").exists()).toBeTruthy();
	});

	it("calls removeEventListener on unmount", () => {
		wrapper.unmount();
		expect(window.removeEventListener).toHaveBeenCalledTimes(1);
	});

	describe("When ViewMember data is present", () => {
		beforeEach(() => {
			wrapper.setProps({ viewMember });
		});

		it("renders 4 tabs", () => {
			expect(wrapper.find("TabPane")).toHaveLength(4);
		});

		it("handles fetching initial response data", () => {
			wrapper.instance().handleFetchMemberResponseInitialData();

			expect(fetchMemberEvents).toHaveBeenCalledWith({ id: viewMember._id });
		});

		it("handles fetching initial schedule data", () => {
			wrapper.instance().handleFetchMemberScheduleInitialData();

			expect(fetchScheduleEvents).toHaveBeenCalledWith({
				id: viewMember._id,
				selectedGames: "My Games",
			});
		});

		it("handles window resizing", () => {
			wrapper.setState({ isCollapsed: true });

			expect(wrapper.find("Tabs").props().tabPosition).toEqual("top");
		});
	});
});
