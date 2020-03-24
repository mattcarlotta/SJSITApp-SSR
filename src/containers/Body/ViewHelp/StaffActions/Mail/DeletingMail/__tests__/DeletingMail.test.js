import DeletingMail from "../index";

const wrapper = shallow(<DeletingMail />);

describe("Help DeletingMail", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
