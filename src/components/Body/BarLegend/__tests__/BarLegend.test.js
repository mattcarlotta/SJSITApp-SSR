import BarLegend from "../index";

const wrapper = mount(<BarLegend />);

describe("BarLegend", () => {
	it("renders without errors", () => {
		expect(wrapper.find("div").exists()).toBeTruthy();
	});
});
