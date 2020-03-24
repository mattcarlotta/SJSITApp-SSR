import ResendingMail from "../index";

const wrapper = shallow(<ResendingMail />);

describe("Help ResendingMail", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
