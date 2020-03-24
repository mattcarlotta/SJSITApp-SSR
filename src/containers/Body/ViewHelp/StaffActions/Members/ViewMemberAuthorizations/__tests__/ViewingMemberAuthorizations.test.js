import ViewingMemberAuthorizations from "../index";

const wrapper = shallow(<ViewingMemberAuthorizations />);

describe("Help ViewingMemberAuthorizations", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
