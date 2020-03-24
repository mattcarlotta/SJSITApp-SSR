import { AppLoader } from "../index";

const authenticateUser = jest.fn();
const hideServerMessage = jest.fn();

const initProps = {
	authenticateUser,
	hideServerMessage,
	loggedinUser: "",
	role: "",
	serverMessage: "",
};

const nextProps = {
	...initProps,
	role: "guest",
};

jest.useFakeTimers();

describe("App Loader", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<AppLoader {...initProps} />);
	});

	afterEach(() => {
		// jest.runAllTimers();
		authenticateUser.mockClear();
	});

	it("initially renders a Spinner", () => {
		expect(wrapper.find("Spinner").exists()).toBeTruthy();
	});

	it("attempts to automatically log the user in from a previous session", () => {
		expect(authenticateUser).toHaveBeenCalledTimes(1);
	});

	it("doesn't call authenticateUser if 'role' is set", () => {
		authenticateUser.mockClear();
		wrapper = shallow(<AppLoader {...nextProps} />);
		expect(authenticateUser).toHaveBeenCalledTimes(0);
	});

	it("renders a login form if the user is determined to be a guest via API", () => {
		wrapper.setProps({ role: "guest" });
		expect(wrapper.find("Connect(LoginForm)").exists()).toBeTruthy();
	});
});
