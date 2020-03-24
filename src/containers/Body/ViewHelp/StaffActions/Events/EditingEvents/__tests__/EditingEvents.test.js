import EditingEvents from "../index";

const wrapper = shallow(<EditingEvents />);

describe("Help EditingEvents", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
