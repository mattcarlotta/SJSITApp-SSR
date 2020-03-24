import Spinner from "../index";

const wrapper = mount(<Spinner />);

describe("Spinner", () => {
	it("renders without errors", () => {
		expect(wrapper.find("Spinner").exists()).toBeTruthy();
	});
});
