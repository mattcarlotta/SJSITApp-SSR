import ChangingEmailPreferences from "../index";

const wrapper = shallow(<ChangingEmailPreferences />);

describe("Help ChangingEmailPreferences", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
