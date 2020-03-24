import DeletingSeasons from "../index";

const wrapper = shallow(<DeletingSeasons />);

describe("Help DeletingSeasons", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
