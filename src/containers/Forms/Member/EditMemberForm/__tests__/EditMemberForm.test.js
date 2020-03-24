import { EditMemberForm } from "../index";

const updateMember = jest.fn();

const viewMember = {
	_id: "0123456789",
	email: "test@example.com",
	emailReminders: true,
	events: [],
	firstName: "test",
	lastName: "example",
	role: "employee",
	registered: "2019-07-26T16:56:40.518+00:00",
	schedule: [],
	status: "active",
};

const initProps = {
	serverMessage: "",
	updateMember,
	viewMember: {},
};

describe("Edit Member Form", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<EditMemberForm {...initProps} />);
	});

	afterEach(() => {
		updateMember.mockClear();
	});

	it("renders without errors", () => {
		expect(wrapper.find("form").exists()).toBeTruthy();
	});

	it("shows a LoadingForm when fetching seasonIds and the token to edit", () => {
		expect(wrapper.find("LoadingForm").exists()).toBeTruthy();
	});

	describe("Form Initialized", () => {
		beforeEach(() => {
			wrapper.setProps({ viewMember });
		});

		it("fills in the fields when loaded", () => {
			expect(
				wrapper
					.find("input")
					.first()
					.props().value,
			).toEqual(viewMember.email);

			expect(
				wrapper
					.find("input")
					.at(1)
					.props().value,
			).toEqual(viewMember.firstName);

			expect(
				wrapper
					.find("input")
					.at(2)
					.props().value,
			).toEqual(viewMember.lastName);

			expect(wrapper.find("DisplayOption").props().value).toEqual(
				viewMember.role,
			);
			expect(wrapper.state("isLoading")).toBeFalsy();
		});

		it("updates a field value when changed", () => {
			const name = "email";
			const newValue = "changedemail@example.com";
			wrapper.instance().handleChange({ target: { name, value: newValue } });
			wrapper.update();

			expect(
				wrapper
					.find("input")
					.first()
					.props().value,
			).toEqual(newValue);
		});

		it("doesn't submit the form if a field has errors", () => {
			const name = "email";
			const newValue = "";
			wrapper.instance().handleChange({ target: { name, value: newValue } });
			wrapper.update();

			wrapper.find("form").simulate("submit");
			expect(updateMember).toHaveBeenCalledTimes(0);
		});

		describe("Form Submission", () => {
			beforeEach(() => {
				jest.useFakeTimers();
				wrapper.find("form").simulate("submit");
				jest.runOnlyPendingTimers();
			});

			it("successful validation calls updateMember with fields", () => {
				expect(wrapper.state("isSubmitting")).toBeTruthy();
				expect(updateMember).toHaveBeenCalledWith({
					_id: viewMember._id,
					email: viewMember.email,
					emailReminders: viewMember.emailReminders,
					firstName: viewMember.firstName,
					lastName: viewMember.lastName,
					role: viewMember.role,
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
