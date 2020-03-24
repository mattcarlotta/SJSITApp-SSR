import CreatingSeasons from "../index";

const wrapper = shallow(<CreatingSeasons />);

describe("Help CreatingSeasons", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
