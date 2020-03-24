import ViewingMemberProfile from "../index";

const wrapper = shallow(<ViewingMemberProfile />);

describe("Help ViewingMemberProfile", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
