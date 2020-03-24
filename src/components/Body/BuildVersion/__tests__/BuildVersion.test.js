import BuildVersion from "../index";

const wrapper = mount(<BuildVersion />);

describe("Build Version", () => {
	it("it renders without errors", () => {
		expect(wrapper.find("div").exists()).toBeTruthy();
	});
});
