import LogoutSession from "../index";

const wrapper = shallow(<LogoutSession />);

describe("Help LogoutSession", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
