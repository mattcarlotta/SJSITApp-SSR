import ViewingAvailability from "../index";

const wrapper = shallow(<ViewingAvailability />);

describe("Help ViewingAvailability", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
