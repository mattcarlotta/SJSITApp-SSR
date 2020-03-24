import { ResetPasswordForm } from "../index";

const resetPassword = jest.fn();

const initProps = {
	history: {},
	serverMessage: "",
	resetPassword,
};

describe("Reset Password Form", () => {
	let wrapper;
	let submitForm;
	beforeEach(() => {
		wrapper = HOCWrap(ResetPasswordForm, initProps);
		submitForm = () => wrapper.find("form").simulate("submit");
	});

	it("renders without errors", () => {
		expect(wrapper.find("form").exists()).toBeTruthy();
	});

	it("if there are errors, it doesn't submit the form", () => {
		submitForm();
		expect(resetPassword).toHaveBeenCalledTimes(0);
	});

	describe("Form Submission", () => {
		beforeEach(() => {
			wrapper.find("input").simulate("change", {
				target: { name: "email", value: "example@test.com" },
			});

			submitForm();
		});

		afterEach(() => {
			resetPassword.mockClear();
		});

		it("submits the form after a successful validation", () => {
			expect(
				wrapper.find("ResetPasswordForm").state("isSubmitting"),
			).toBeTruthy();
			expect(resetPassword).toHaveBeenCalledTimes(1);
		});

		it("on submission error, enables the form submit button", () => {
			wrapper.setProps({ serverMessage: "Example error message." });

			expect(
				wrapper.find("ResetPasswordForm").state("isSubmitting"),
			).toBeFalsy();
			expect(wrapper.find("button[type='submit']").exists()).toBeTruthy();
		});
	});
});
