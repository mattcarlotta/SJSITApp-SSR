import ViewingForms from "../index";

const wrapper = shallow(<ViewingForms />);

describe("Help ViewingForms", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
