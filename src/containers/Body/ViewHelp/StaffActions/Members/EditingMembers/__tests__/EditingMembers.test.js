import EditingMembers from "../index";

const wrapper = shallow(<EditingMembers />);

describe("Help EditingMembers", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
