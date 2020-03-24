import ViewingAllMembers from "../index";

const wrapper = shallow(<ViewingAllMembers />);

describe("Help ViewingAllMembers", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
