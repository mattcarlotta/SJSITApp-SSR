import Badge from "../index";

const initProps = {
	response: "",
	children: "Hello",
};

describe("Badge", () => {
	let wrapper;
	let icon;
	beforeEach(() => {
		wrapper = mount(<Badge {...initProps} />);
		icon = () => wrapper.find("FaCircle").prop("style");
	});

	it("renders without errors", () => {
		expect(wrapper.find("div").exists()).toBeTruthy();
	});

	it("initially renders a transparent color", () => {
		expect(icon()).toHaveProperty("color", "transparent");
	});

	it("renders 'I want to work.' response color", () => {
		wrapper.setProps({ response: "I want to work." });
		expect(icon()).toHaveProperty("color", "#247BA0");
	});

	it("renders 'Available to work.' response color", () => {
		wrapper.setProps({ response: "Available to work." });
		expect(icon()).toHaveProperty("color", "#2A9D8F");
	});

	it("renders 'Prefer not to work.' response color", () => {
		wrapper.setProps({ response: "Prefer not to work." });
		expect(icon()).toHaveProperty("color", "#F4A261");
	});

	it("renders 'Not available to work.' response color", () => {
		wrapper.setProps({ response: "Not available to work." });
		expect(icon()).toHaveProperty("color", "#FF8060");
	});

	it("renders 'No response.' response color", () => {
		wrapper.setProps({ response: "No response." });
		expect(icon()).toHaveProperty("color", "#BFBFBF");
	});

	it("renders 'Scheduled.' response color", () => {
		wrapper.setProps({ response: "Scheduled." });
		expect(icon()).toHaveProperty("color", "limegreen");
	});
});
