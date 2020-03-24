import ChangingEmail from "../index";

const wrapper = shallow(<ChangingEmail />);

describe("Help ChangingEmail", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
