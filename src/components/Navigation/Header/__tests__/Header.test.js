import Header from "../index";

const wrapper = HOCWrap(Header);

describe("Header", () => {
	it("renders without errors", () => {
		expect(wrapper.find("NavBarContainer").exists()).toBeTruthy();
	});
});
