import SendingForms from "../index";

const wrapper = shallow(<SendingForms />);

describe("Help SendingForms", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
