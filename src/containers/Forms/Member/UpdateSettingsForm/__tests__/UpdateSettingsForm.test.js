import { UpdateSettingsForm } from "../index";

const updateSettings = jest.fn();
const viewMember = {
	email: "test@example.com",
	emailReminders: true,
	firstName: "Beta",
	lastName: "Tester",
	registered: "2019-09-13T16:44:27.649Z",
	role: "employee",
	status: "active",
	_id: "5d7bc76cb91acc3a5744c3cd",
};

const initProps = {
	serverMessage: "",
	updateSettings,
	viewMember: {},
};

const updatedValues = [
	{
		name: "emailReminders",
		value: true,
	},
	{
		name: "email",
		value: "test2@example.com",
	},
	{
		name: "firstName",
		value: "Test",
	},
	{
		name: "lastName",
		value: "Example",
	},
];

describe("Update Member Form", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<UpdateSettingsForm {...initProps} />);
	});

	it("initially renders a LoadingForm component", () => {
		expect(wrapper.find("LoadingForm").exists()).toBeTruthy();
	});

	describe("Form Initialized", () => {
		beforeEach(() => {
			wrapper.setProps({ viewMember });
		});

		it("updates a field value when changed", () => {
			const name = "email";
			const newValue = "test@test.com";
			wrapper.instance().handleChange({ target: { name, value: newValue } });
			wrapper.update();

			expect(
				wrapper
					.find("Input")
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
			expect(updateSettings).toHaveBeenCalledTimes(0);
		});
	});

	describe("Form Submission", () => {
		beforeEach(() => {
			updatedValues.forEach(({ name, value }) => {
				wrapper.instance().handleChange({ target: { name, value } });
			});
			wrapper.update();
			wrapper.find("form").simulate("submit");
		});

		it("successful validation calls updateEvent with fields", () => {
			expect(wrapper.state("isSubmitting")).toBeTruthy();
			expect(updateSettings).toHaveBeenCalledWith({
				emailReminders: true,
				email: "test2@example.com",
				firstName: "Test",
				lastName: "Example",
			});
		});

		it("on submission error, falls back to the form", () => {
			wrapper.setProps({ serverMessage: "Example error message." });

			expect(wrapper.state("isSubmitting")).toBeFalsy();
		});
	});
});
