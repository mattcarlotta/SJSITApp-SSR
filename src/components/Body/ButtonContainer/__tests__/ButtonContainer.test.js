import ButtonContainer from "../index";

describe("Button Container", () => {
	let wrapper;
	let findBtnCtnr;
	beforeEach(() => {
		wrapper = mount(<ButtonContainer />);
		findBtnCtnr = () => wrapper.find("ButtonContainer");
	});

	it("initially renders a default button container", () => {
		const StyledBtnCtnr = findBtnCtnr();
		expect(StyledBtnCtnr.exists()).toBeTruthy();
		expect(StyledBtnCtnr).toHaveStyleRule("background", "transparent");
	});

	it("displays a primary button container when passed a 'primary' prop", () => {
		wrapper.setProps({ primary: true });
		expect(findBtnCtnr()).toHaveStyleRule(
			"background",
			"linear-gradient(90deg,#194048 0%,#0f7888 50%,#194048 100%)",
		);
	});

	it("displays a danger button container when passed a 'danger' prop", () => {
		wrapper.setProps({ danger: true });
		expect(findBtnCtnr()).toHaveStyleRule(
			"background",
			"linear-gradient(90deg,#8a4133 0%,#f56342 50%,#8a4133 100%)",
		);
	});

	it("displays a tertiary button container when passed a 'tertiary' prop", () => {
		wrapper.setProps({ tertiary: true });
		expect(findBtnCtnr()).toHaveStyleRule(
			"background",
			"linear-gradient(90deg,#12454e 0%,rgb(16,116,131) 50%,#12454e 100%)",
		);
	});
});
