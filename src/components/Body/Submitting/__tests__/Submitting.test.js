import Submitting from "../index";

const wrapper = mount(<Submitting />);

describe("Submitting", () => {
	it("renders without errors", () => {
		expect(wrapper.find("Submitting").exists()).toBeTruthy();
	});
});
