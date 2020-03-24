import EditingForms from "../index";

const wrapper = shallow(<EditingForms />);

describe("Help EditingForms", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
