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
		expect(StyledBtnCtnr).toHaveStyleRule("background-color", "transparent");
	});

	it("displays a primary button container when passed a 'primary' prop", () => {
		wrapper.setProps({ primary: true });
		expect(findBtnCtnr()).toHaveStyleRule("background-color", "#025f6d");
	});

	it("displays a danger button container when passed a 'danger' prop", () => {
		wrapper.setProps({ danger: true });
		expect(findBtnCtnr()).toHaveStyleRule("background-color", "#f56342");
	});
});
