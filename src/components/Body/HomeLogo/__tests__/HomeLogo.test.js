import HomeLogo from "../index";

const wrapper = mount(<HomeLogo />);

describe("Home Logo", () => {
	it("renders without errors", () => {
		expect(wrapper.find("img").exists()).toBeTruthy();
	});
});
