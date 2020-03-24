import RightMenu from "../index";

const wrapper = shallow(<RightMenu />);

describe("Right Menu", () => {
	it("renders without errors", () => {
		expect(wrapper.find("Float").exists()).toBeTruthy();
	});
});
