import CreatingEvents from "../index";

const wrapper = shallow(<CreatingEvents />);

describe("Help CreatingEvents", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
