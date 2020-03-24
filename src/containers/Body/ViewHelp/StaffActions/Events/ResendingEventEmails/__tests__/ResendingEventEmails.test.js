import ResendingEventEmails from "../index";

const wrapper = shallow(<ResendingEventEmails />);

describe("Help ResendingEventEmails", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
