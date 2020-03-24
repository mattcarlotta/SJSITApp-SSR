import CreatingForms from "../index";

const wrapper = shallow(<CreatingForms />);

describe("Help CreatingForms", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
