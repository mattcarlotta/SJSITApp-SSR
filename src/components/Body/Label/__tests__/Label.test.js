import Label from "../index";

const initProps = {
	name: "email",
	label: "email",
	tooltip: "",
};

const wrapper = mount(<Label {...initProps} />);

describe("Label", () => {
	it("renders without errors", () => {
		expect(wrapper.find("label").exists()).toBeTruthy();
	});

	it("renders a icon with a tooltip", () => {
		const tooltip = "Testing a tooltip.";
		wrapper.setProps({ tooltip });

		expect(wrapper.find("span.tooltip").exists()).toBeTruthy();
		expect(wrapper.find("GoQuestion").exists()).toBeTruthy();
	});
});
