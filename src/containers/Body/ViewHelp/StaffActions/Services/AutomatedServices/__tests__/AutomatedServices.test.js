import AutomatedServices from "../index";

const wrapper = shallow(<AutomatedServices />);

describe("Help AutomatedServices", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
