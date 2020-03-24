import ResendingFormEmails from "../index";

const wrapper = shallow(<ResendingFormEmails />);

describe("Help ResendingFormEmails", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
