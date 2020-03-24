import { ContactForm } from "../index";

const contactUs = jest.fn();

const initProps = {
	contactUs,
	serverMessage: "",
};

const updatedValues = [
	{
		name: "sendTo",
		value: "Staff",
	},
	{
		name: "subject",
		value: "Test",
	},
	{
		name: "message",
		value: "<span>Test</span>",
	},
];

describe("Contact Form", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<ContactForm {...initProps} />);
	});

	it("renders without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});

	it("doesn't submit the form if a field has errors", () => {
		wrapper.find("form").simulate("submit");
		expect(contactUs).toHaveBeenCalledTimes(0);
	});

	it("updates a field value when changed", () => {
		const name = "subject";
		const newValue = "Test";
		wrapper.instance().handleChange({ target: { name, value: newValue } });
		wrapper.update();

		expect(
			wrapper
				.find("Input")
				.first()
				.props().value,
		).toEqual(newValue);
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
			expect(contactUs).toHaveBeenCalledWith({
				sendTo: "Staff",
				subject: "Test",
				message: "<span>Test</span>",
			});
		});

		it("on submission error, falls back to the form", () => {
			wrapper.setProps({ serverMessage: "Example error message." });

			expect(wrapper.state("isSubmitting")).toBeFalsy();
		});
	});
});
