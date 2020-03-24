import { EditAuthorizationForm } from "../index";

const fetchToken = jest.fn();
const goBack = jest.fn();
const updateMemberToken = jest.fn();

const initProps = {
	fetchToken,
	match: {
		params: {
			id: "5d44a76ad49a24023e0af7dc",
		},
	},
	goBack,
	serverMessage: "",
	updateMemberToken,
};

const editToken = {
	email: "",
	_id: "5d44a76ad49a24023e0af7dc",
	authorizedEmail: "test@test.com",
	role: "employee",
};

describe("Edit Authorization Form", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<EditAuthorizationForm {...initProps} />);
	});

	afterEach(() => {
		fetchToken.mockClear();
		updateMemberToken.mockClear();
	});

	it("renders without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});

	it("shows a LoadingForm when fetching the token to edit", () => {
		expect(wrapper.find("LoadingForm").exists()).toBeTruthy();
	});

	it("calls fetchToken on mount", () => {
		expect(fetchToken).toHaveBeenCalledTimes(1);
	});

	describe("Form Initialized", () => {
		beforeEach(() => {
			wrapper.setProps({ editToken });
		});

		it("initializes the fields with editToken and seasonIds values", () => {
			expect(
				wrapper
					.find("DisplayOption")
					.first()
					.props().value,
			).toEqual(editToken.role);
			expect(wrapper.find("input").props().value).toEqual(
				editToken.authorizedEmail,
			);

			expect(wrapper.state("isLoading")).toBeFalsy();
		});

		it("updates a field value when changed", () => {
			const name = "authorizedEmail";
			const newValue = "changedemail@example.com";
			wrapper.instance().handleChange({ target: { name, value: newValue } });
			wrapper.update();

			expect(wrapper.find("input").props().value).toEqual(newValue);
		});

		it("doesn't submit the form if a field has errors", () => {
			const name = "authorizedEmail";
			const newValue = "";
			wrapper.instance().handleChange({ target: { name, value: newValue } });
			wrapper.update();

			wrapper.find("form").simulate("submit");
			expect(updateMemberToken).toHaveBeenCalledTimes(0);
		});

		describe("Form Submission", () => {
			beforeEach(() => {
				wrapper.find("form").simulate("submit");
			});

			it("successful validation calls updateMember with fields", () => {
				expect(wrapper.state("isSubmitting")).toBeTruthy();
				expect(updateMemberToken).toHaveBeenCalledWith({
					_id: editToken._id,
					authorizedEmail: editToken.authorizedEmail,
					role: editToken.role,
					seasonId: editToken.seasonId,
				});
			});

			it("on submission error, enables the form submit button", () => {
				wrapper.setProps({ serverMessage: "Example error message." });

				expect(wrapper.state("isSubmitting")).toBeFalsy();
				expect(wrapper.find("button[type='submit']").exists()).toBeTruthy();
			});
		});
	});
});
