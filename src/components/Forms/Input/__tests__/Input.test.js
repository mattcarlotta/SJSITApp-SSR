import Input from "../index";

const onChange = jest.fn();

const initProps = {
	className: "",
	containerStyle: {},
	disabled: false,
	errors: "",
	icon: "",
	inputStyle: {},
	isFocused: "",
	label: "",
	name: "password",
	onChange,
	placeholder: "Enter a password...",
	readOnly: false,
	tooltip: "",
	type: "text",
	value: "",
};

describe("Input", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<Input {...initProps} />);
	});

	it("renders without errors", () => {
		expect(wrapper.find("input").exists()).toBeTruthy();
	});

	it("doesn't display an Icon if 'icon' is missing", () => {
		expect(wrapper.find("i").exists()).toBeFalsy();
	});

	it("displays a Font Awesome icon by a string type", () => {
		wrapper.setProps({ icon: "key" });

		expect(wrapper.find("i").exists()).toBeTruthy();
		expect(wrapper.find("FaKey").exists()).toBeTruthy();
	});

	it("displays a label and a tooltip", () => {
		wrapper.setProps({
			label: "Password",
			tooltip: "Your password must be longer than 5 characters.",
		});

		expect(
			wrapper
				.find("Tooltip")
				.first()
				.exists(),
		).toBeTruthy();
		expect(
			wrapper
				.find("Label")
				.at(1)
				.text(),
		).toContain("Password");
	});

	it("when invalid, adds a 'error' classname and displays validation errors", () => {
		wrapper.setProps({ errors: "Required." });

		expect(wrapper.find("div.error").exists()).toBeTruthy();
		expect(wrapper.find("Errors").text()).toEqual("Required.");
	});

	it("when clicked, adds a 'focused' className", () => {
		wrapper.find("ClickHandler").setState({ isFocused: true });

		expect(wrapper.find("div.focused").exists()).toBeTruthy();
	});

	it("when disabled, adds a 'disabled' className and disables the input", () => {
		wrapper.setProps({ disabled: true });

		expect(wrapper.find("div.disabled").exists()).toBeTruthy();
		expect(wrapper.find("input").prop("disabled")).toEqual(true);
	});
});
