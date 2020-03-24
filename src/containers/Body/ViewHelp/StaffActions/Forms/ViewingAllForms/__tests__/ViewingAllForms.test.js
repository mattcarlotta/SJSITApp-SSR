import ViewingAllForms from "../index";

const wrapper = shallow(<ViewingAllForms />);

describe("Help ViewingAllForms", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
