import ViewingAllEvents from "../index";

const wrapper = shallow(<ViewingAllEvents />);

describe("Help ViewingAllEvents", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
