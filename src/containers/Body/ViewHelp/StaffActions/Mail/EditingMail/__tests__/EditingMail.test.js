import EditingMail from "../index";

const wrapper = shallow(<EditingMail />);

describe("Help EditingMail", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
