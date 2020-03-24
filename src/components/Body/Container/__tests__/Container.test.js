import Container from "../index";

describe("Container", () => {
	let wrapper;
	let findCtnr;
	beforeEach(() => {
		wrapper = mount(<Container />);
		findCtnr = () => wrapper.find("Container");
	});

	it("initially renders a default container", () => {
		const StyledCtnr = findCtnr();
		expect(StyledCtnr.exists()).toBeTruthy();
		expect(StyledCtnr).toHaveStyleRule("width", "100%");
	});

	it("adjusts the container width when passed a 'width' prop", () => {
		wrapper.setProps({ width: "100px" });
		expect(findCtnr()).toHaveStyleRule("width", "100px");
	});
});
