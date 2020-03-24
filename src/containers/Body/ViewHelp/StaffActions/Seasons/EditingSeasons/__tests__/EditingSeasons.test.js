import EditingSeasons from "../index";

const wrapper = shallow(<EditingSeasons />);

describe("Help EditingSeasons", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
