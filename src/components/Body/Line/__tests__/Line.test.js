import Line from "../index";

const initProps = {
	width: "",
	centered: false,
};

describe("Line", () => {
	let wrapper;
	let StyledLine;
	beforeEach(() => {
		wrapper = mount(<Line {...initProps} />);
		StyledLine = () => wrapper.find("Line");
	});

	it("renders without errors", () => {
		expect(StyledLine().exists()).toBeTruthy();
		expect(StyledLine()).toHaveStyleRule("width", "100%");
	});

	it("renders a small line", () => {
		wrapper.setProps({ width: "100px" });
		expect(StyledLine()).toHaveStyleRule("width", "100px");
	});

	it("renders a centered line", () => {
		wrapper.setProps({ centered: true });
		expect(StyledLine()).toHaveStyleRule("margin", "0 auto");
	});
});
