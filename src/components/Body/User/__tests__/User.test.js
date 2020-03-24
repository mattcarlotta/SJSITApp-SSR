import User from "../index";

const initProps = {
	isDragging: false,
	response: "No response.",
};

describe("User", () => {
	let wrapper;
	let findStyledUser;
	beforeEach(() => {
		wrapper = mount(<User {...initProps} />);
		findStyledUser = () => wrapper.find("User");
	});

	it("renders without errors", () => {
		expect(wrapper.find("User").exists()).toBeTruthy();
	});

	it("initially displays an unselected User", () => {
		const StyledUser = findStyledUser();
		expect(StyledUser).toHaveStyleRule("background-color", "#BFBFBF");
		expect(StyledUser).toHaveStyleRule("color", "#555");
		expect(StyledUser).toHaveStyleRule(
			"box-shadow",
			"0 1px 0 rgba(9,30,66,.25)",
		);
	});

	it("initially displays a 'I want to work.' User", () => {
		wrapper.setProps({ response: "I want to work." });
		const StyledUser = findStyledUser();
		expect(StyledUser).toHaveStyleRule("background-color", "#247BA0");
		expect(StyledUser).toHaveStyleRule("color", "#fff");
	});

	it("initially displays a 'Available to work.' User", () => {
		wrapper.setProps({ response: "Available to work." });
		const StyledUser = findStyledUser();
		expect(StyledUser).toHaveStyleRule("background-color", "#2A9D8F");
		expect(StyledUser).toHaveStyleRule("color", "#fff");
	});

	it("initially displays a 'Prefer not to work.' User", () => {
		wrapper.setProps({ response: "Prefer not to work." });
		const StyledUser = findStyledUser();
		expect(StyledUser).toHaveStyleRule("background-color", "#F4A261");
		expect(StyledUser).toHaveStyleRule("color", "#fff");
	});

	it("initially displays a 'Not available to work.' User", () => {
		wrapper.setProps({ response: "Not available to work." });
		const StyledUser = findStyledUser();
		expect(StyledUser).toHaveStyleRule("background-color", "#FF8060");
		expect(StyledUser).toHaveStyleRule("color", "#fff");
	});

	it("displays a selected User", () => {
		wrapper.setProps({ isDragging: true });

		const StyledUser = findStyledUser();
		expect(StyledUser).toHaveStyleRule("background-color", "#03a9f3");
		expect(StyledUser).toHaveStyleRule("color", "#fff");
		expect(StyledUser).toHaveStyleRule(
			"box-shadow",
			"0px 10px 13px -7px #8433FF,5px 5px 5px -2px #8433FF",
		);
	});
});
