import NoUsers from "../index";

describe("No Users", () => {
	it("renders without errors", () => {
		const wrapper = mount(<NoUsers />);
		expect(wrapper.find("NoUsers").exists()).toBeTruthy();
	});
});
