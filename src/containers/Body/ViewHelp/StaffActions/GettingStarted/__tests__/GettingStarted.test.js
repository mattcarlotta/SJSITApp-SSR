import GettingStarted from "../index";

const wrapper = shallow(<GettingStarted />);

describe("Help GettingStarted", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
