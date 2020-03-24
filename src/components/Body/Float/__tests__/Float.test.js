import Float from "../index";

describe("Float", () => {
	let wrapper;
	let findFloat;
	beforeEach(() => {
		wrapper = mount(<Float />);
		findFloat = () => wrapper.find("Float");
	});

	it("initially renders a default floating right div", () => {
		const StyledCtnr = findFloat();
		expect(StyledCtnr.exists()).toBeTruthy();
		expect(StyledCtnr).toHaveStyleRule("float", "right");
	});

	it("adjusts the div's float direction when passed a 'direction' prop", () => {
		wrapper.setProps({ direction: "left" });
		expect(findFloat()).toHaveStyleRule("float", "left");
	});
});
