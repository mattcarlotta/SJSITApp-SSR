import DeletingMembers from "../index";

const wrapper = shallow(<DeletingMembers />);

describe("Help DeletingMembers", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
