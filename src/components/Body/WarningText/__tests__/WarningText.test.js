import WarningText from "../index";

const initProps = {
	children: <p>Hello</p>,
};

const wrapper = mount(<WarningText {...initProps} />);

describe("Warning Text", () => {
	it("renders without errors", () => {
		expect(wrapper.find("WarningText")).toBeTruthy();
	});
});
