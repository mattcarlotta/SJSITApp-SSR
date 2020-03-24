import { AccountButton } from "../index";

const signoutUser = jest.fn();
const push = jest.fn();

const initProps = {
	firstName: "Beta",
	lastName: "Tester",
	push,
	signoutUser,
};

describe("Account Button", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<AccountButton {...initProps} />);
	});

	afterEach(() => {
		push.mockClear();
		signoutUser.mockClear();
	});

	it("renders without errors", () => {
		expect(wrapper.find("AccountButton").exists()).toBeTruthy();
	});

	it("renders a Settings button that pushes to '/employee/settings'", () => {
		wrapper
			.find("Dropdown")
			.at(0)
			.simulate("click");

		wrapper
			.find("Tooltip")
			.find("button")
			.at(0)
			.simulate("click");
		expect(push).toHaveBeenCalledWith("/employee/settings");
	});

	it("renders a Logout button that calls a 'signoutUser' action creator", () => {
		wrapper
			.find("Dropdown")
			.at(0)
			.simulate("click");

		wrapper
			.find("Tooltip")
			.find("button")
			.at(1)
			.simulate("click");
		expect(signoutUser).toHaveBeenCalledTimes(1);
	});
});
