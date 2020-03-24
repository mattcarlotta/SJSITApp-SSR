import { LoginForm } from "../index";

const signinUser = jest.fn();

const initProps = {
	serverMessage: "",
	signinUser,
};

describe("Login Form", () => {
	let wrapper;
	let submitForm;
	beforeEach(() => {
		wrapper = HOCWrap(LoginForm, initProps);
		submitForm = () => wrapper.find("form").simulate("submit");
	});

	it("renders without errors", () => {
		expect(wrapper.find("form").exists()).toBeTruthy();
	});

	it("if there are errors, it doesn't submit the form", () => {
		submitForm();
		expect(signinUser).toHaveBeenCalledTimes(0);
	});

	describe("Form Submission", () => {
		beforeEach(() => {
			wrapper
				.find("input")
				.first()
				.simulate("change", {
					target: { name: "email", value: "test@email.com" },
				});

			wrapper
				.find("input")
				.at(1)
				.simulate("change", { target: { name: "password", value: "12345" } });

			submitForm();
		});

		afterEach(() => {
			signinUser.mockClear();
		});

		it("submits the form after a successful validation", () => {
			expect(wrapper.find("LoginForm").state("isSubmitting")).toBeTruthy();
			expect(signinUser).toHaveBeenCalledTimes(1);
		});

		it("on submission error, enables the form submit button", () => {
			wrapper.setProps({ serverMessage: "Example error message." });

			expect(wrapper.find("LoginForm").state("isSubmitting")).toBeFalsy();
			expect(wrapper.find("button[type='submit']").exists()).toBeTruthy();
		});
	});
});
