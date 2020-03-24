import DeletingForms from "../index";

const wrapper = shallow(<DeletingForms />);

describe("Help DeletingForms", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
