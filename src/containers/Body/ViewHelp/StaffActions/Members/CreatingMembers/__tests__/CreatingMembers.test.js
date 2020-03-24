import CreatingMembers from "../index";

const wrapper = shallow(<CreatingMembers />);

describe("Help CreatingMembers", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
