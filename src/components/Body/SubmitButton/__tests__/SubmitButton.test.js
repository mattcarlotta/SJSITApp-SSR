import SubmitButton from "../index";

const initProps = {
	isSubmitting: false,
	title: "Submit",
};

const wrapper = shallow(<SubmitButton {...initProps} />);

describe("Submit Button", () => {
	it("initially renders a submit button", () => {
		expect(wrapper.find("Button").exists()).toBeTruthy();
	});

	it("renders a spinner when submitting", () => {
		wrapper.setProps({ isSubmitting: true });
		expect(wrapper.find("Submitting").exists()).toBeTruthy();
	});
});
