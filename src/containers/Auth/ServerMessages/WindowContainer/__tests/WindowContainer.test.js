import WindowContainer from "../index";

const initProps = {
	state: "entering",
};

describe("Server Message - Window Container", () => {
	let wrapper;
	let containerNode;
	beforeEach(() => {
		wrapper = mount(<WindowContainer {...initProps} />);
		containerNode = () => wrapper.find("WindowContainer");
	});

	it("initially starts off screen", () => {
		expect(containerNode()).toHaveStyleRule("top", "-200px");
		expect(containerNode()).toHaveStyleRule("opacity", "0.01");
	});

	it("display at top of screen", () => {
		wrapper.setProps({ state: "entered" });

		expect(containerNode()).toHaveStyleRule("top", "25px");
		expect(containerNode()).toHaveStyleRule("opacity", "1");
	});

	it("exits from top of screen", () => {
		wrapper.setProps({ state: "exiting" });

		expect(containerNode()).toHaveStyleRule("top", "-200px");
		expect(containerNode()).toHaveStyleRule("opacity", "0.01");
		expect(containerNode()).toHaveStyleRule("transition", "0.9s");
	});

	it("disappears", () => {
		wrapper.setProps({ state: "exited" });
		expect(containerNode()).toHaveStyleRule("opacity", "0");
	});
});
