import SchedulingEvents from "../index";

const wrapper = shallow(<SchedulingEvents />);

describe("Help SchedulingEvents", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
