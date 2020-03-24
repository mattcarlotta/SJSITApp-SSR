import CreatingMail from "../index";

const wrapper = shallow(<CreatingMail />);

describe("Help CreatingMail", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
