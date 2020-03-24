import DeletingEvents from "../index";

const wrapper = shallow(<DeletingEvents />);

describe("Help DeletingEvents", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
