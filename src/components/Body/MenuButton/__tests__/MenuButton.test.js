import MenuButton from "../index";

describe("MenuButton", () => {
	let wrapper;
	let findBtnCtnr;
	beforeEach(() => {
		wrapper = mount(<MenuButton />);
		findBtnCtnr = () => wrapper.find("MenuButton");
	});

	it("initially renders a default MenuButton", () => {
		const StyledBtnCtnr = findBtnCtnr();
		expect(StyledBtnCtnr.exists()).toBeTruthy();
		expect(StyledBtnCtnr).toHaveStyleRule("background-color", "transparent", {
			modifier: ":hover",
		});
	});

	it("displays a hoverable MenuButton when passed a 'hoverable' prop", () => {
		wrapper.setProps({ hoverable: true });
		expect(findBtnCtnr()).toHaveStyleRule("background-color", "#d8d8d8", {
			modifier: ":hover",
		});
	});
});
