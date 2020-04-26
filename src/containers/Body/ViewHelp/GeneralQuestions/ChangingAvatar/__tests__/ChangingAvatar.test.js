import ChangingAvatar from "../index";

const wrapper = shallow(<ChangingAvatar />);

describe("Help ChangingAvatar", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
