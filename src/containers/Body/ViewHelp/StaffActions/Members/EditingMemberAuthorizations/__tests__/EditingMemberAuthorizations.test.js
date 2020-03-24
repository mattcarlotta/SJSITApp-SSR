import EditingMemberAuthorizations from "../index";

const wrapper = shallow(<EditingMemberAuthorizations />);

describe("Help EditingMemberAuthorizations", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
