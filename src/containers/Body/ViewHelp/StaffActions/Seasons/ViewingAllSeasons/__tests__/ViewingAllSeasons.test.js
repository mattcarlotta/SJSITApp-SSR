import ViewingAllSeasons from "../index";

const wrapper = shallow(<ViewingAllSeasons />);

describe("Help ViewingAllSeasons", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
