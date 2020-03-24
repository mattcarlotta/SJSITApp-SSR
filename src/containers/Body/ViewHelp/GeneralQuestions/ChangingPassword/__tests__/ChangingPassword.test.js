import ChangingPassword from "../index";

const wrapper = shallow(<ChangingPassword />);

describe("Help ChangingPassword", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
