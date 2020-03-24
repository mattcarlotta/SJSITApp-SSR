import ChangingName from "../index";

const wrapper = shallow(<ChangingName />);

describe("Help ChangingName", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
