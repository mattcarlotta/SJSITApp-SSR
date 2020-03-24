import ViewingMembersAvailability from "../index";

const wrapper = shallow(<ViewingMembersAvailability />);

describe("Help ViewingMembersAvailability", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
