import { NewPasswordForm } from "../index";

const updateUserPassword = jest.fn();
const push = jest.fn();

const initProps = {
	history: {
		location: {
			search:
				"?token=GHPtUGSNGwkA1VC4P2O$f05eBQT/HLDR6sdKz2.v8.KzmWn36KsEVCROrLaQzVH5",
		},
	},
	push,
	serverMessage: "",
	updateUserPassword,
};

describe("New Password Form", () => {
	let wrapper;
	let submitForm;
	beforeEach(() => {
		wrapper = HOCWrap(NewPasswordForm, initProps);
		submitForm = () => wrapper.find("form").simulate("submit");
	});

	it("renders without errors", () => {
		expect(wrapper.find("form").exists()).toBeTruthy();
	});

	it("if token is missing from URL, it redirects back to login", () => {
		wrapper = HOCWrap(NewPasswordForm, {
			...initProps,
			history: {
				location: {
					search: "",
				},
				push,
			},
		});
		expect(push).toHaveBeenCalledWith("/employee/login");
	});

	it("if there are errors, it doesn't submit the form", () => {
		submitForm();

		expect(updateUserPassword).toHaveBeenCalledTimes(0);
	});

	describe("Form Submission", () => {
		beforeEach(() => {
			wrapper
				.find("input")
				.simulate("change", { target: { name: "password", value: "12345" } });

			submitForm();
		});

		afterEach(() => {
			updateUserPassword.mockClear();
		});

		it("submits the form after a successful validation", () => {
			expect(
				wrapper.find("NewPasswordForm").state("isSubmitting"),
			).toBeTruthy();
			expect(updateUserPassword).toHaveBeenCalledTimes(1);
		});

		it("on submission error, enables the form submit button", () => {
			wrapper.setProps({ serverMessage: "Example error message." });

			expect(wrapper.find("NewPasswordForm").state("isSubmitting")).toBeFalsy();
			expect(wrapper.find("button[type='submit']").exists()).toBeTruthy();
		});
	});
});
