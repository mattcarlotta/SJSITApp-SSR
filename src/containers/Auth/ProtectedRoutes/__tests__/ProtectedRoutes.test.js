import AppLoader from "containers/Auth/AppLoader";
import NewPasswordForm from "containers/Forms/Auth/NewPasswordForm";
import ResetPasswordForm from "containers/Forms/Auth/ResetPasswordForm";
import SignupForm from "containers/Forms/Auth/SignupForm";
import { ProtectedRoutes, authError, sessionError } from "../index";

const signin = jest.fn();

const initProps = {
	firstName: "",
	lastName: "",
	location: {
		pathname: "",
	},
	match: {
		url: "/employee",
	},
	push: jest.fn(),
	role: "",
	serverMessage: "",
	signin,
};

describe("Protected Routes Middleware", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<ProtectedRoutes {...initProps} />);
	});

	afterEach(() => {
		signin.mockClear();
	});

	it("renders the App if authenticated", () => {
		wrapper.setProps({ role: "employee" });
		expect(wrapper.find("App")).toBeTruthy();
	});

	describe("Unauthenticated Routing", () => {
		it("initially renders 4 routes", () => {
			expect(wrapper.find("Route")).toHaveLength(4);
		});

		it("logs the user out if an authError was returned from the API", () => {
			wrapper.setProps({ serverMessage: authError });
			expect(signin).toHaveBeenCalledTimes(1);
		});

		it("logs the user out if an sessionError was returned from the API", () => {
			wrapper.setProps({ serverMessage: sessionError });
			expect(signin).toHaveBeenCalledTimes(1);
		});

		it("doesn't log the user out of the session if a different API message was set", () => {
			wrapper.setProps({ serverMessage: "Successfully updated the form!" });
			expect(signin).toHaveBeenCalledTimes(0);
		});

		it("doesn't log the user out of the session if the user role is a guest", () => {
			wrapper.setProps({
				serverMessage: "Successfully updated the form!",
				role: "guest",
			});
			expect(signin).toHaveBeenCalledTimes(0);
		});

		it("routes to NewPasswordForm", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/newpassword/:id']")
					.prop("component"),
			).toBe(NewPasswordForm);
		});

		it("routes to ResetPasswordForm", () => {
			expect(
				wrapper
					.find("Route[exact=true][path='/employee/resetpassword']")
					.prop("component"),
			).toBe(ResetPasswordForm);
		});

		it("routes to SignupForm", () => {
			expect(
				wrapper.find("Route[path='/employee/signup']").prop("component"),
			).toBe(SignupForm);
		});

		it("routes to AppLoader if none of the routes are matched", () => {
			expect(wrapper.find("Route[path='/employee']").prop("component")).toBe(
				AppLoader,
			);
		});
	});
});
