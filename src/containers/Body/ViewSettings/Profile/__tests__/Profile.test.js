// import moment from "~utils/momentWithTZ";
import Profile from "../index";

const deleteUserAvatar = jest.fn();
const updateUserAvatar = jest.fn();

const initProps = {
	viewMember: {
		_id: "0123456789",
		avatar: "123.png",
		firstName: "Beta",
		lastName: "Tester",
		registered: "2019-07-26T16:56:40.518+00:00",
		role: "member",
		status: "active",
	},
	deleteUserAvatar,
	serverMessage: "",
	updateUserAvatar,
};

describe("Settings Profile", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = withRouterContext(Profile, initProps);
	});

	afterEach(() => {
		deleteUserAvatar.mockClear();
	});

	it("renders without errors", () => {
		expect(wrapper.find("PaneBody").exists()).toBeTruthy();
	});

	it("calls deleteAvatar", () => {
		wrapper.find("Button#delete-avatar").first().simulate("click");

		expect(deleteUserAvatar).toHaveBeenCalledWith(initProps.viewMember._id);
	});
});
