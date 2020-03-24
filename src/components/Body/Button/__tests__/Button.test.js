import Button from "../index";

const onClick = jest.fn();
const onBlur = jest.fn();
const onMouseDown = jest.fn();
const onMouseEnter = jest.fn();
const onMouseLeave = jest.fn();
const onTouchStart = jest.fn();

const initProps = {
	children: "Test",
	onBlur,
	onClick,
	onMouseDown,
	onMouseEnter,
	onMouseLeave,
	onTouchStart,
	type: "button",
};

describe("Styled Button", () => {
	let wrapper;
	let findStyledButton;
	beforeEach(() => {
		wrapper = mount(<Button {...initProps} />);
		findStyledButton = () => wrapper.find("StyledButton");
	});

	it("renders without errors", () => {
		expect(wrapper.find("StyledButton").exists()).toBeTruthy();
	});

	it("initially displays a default button", () => {
		const StyledButton = findStyledButton();
		expect(StyledButton).toHaveStyleRule("cursor", "pointer");
		expect(StyledButton).toHaveStyleRule("color", "#025f6d");
		expect(StyledButton).toHaveStyleRule("background-color", "transparent");
		expect(StyledButton).toHaveStyleRule("text-transform", "none");
		expect(StyledButton).toHaveStyleRule("border", "2px solid transparent");

		expect(StyledButton).toHaveStyleRule("color", "#04515d", {
			modifier: ":hover",
		});
		expect(StyledButton).toHaveStyleRule("background-color", "#d8d8d8", {
			modifier: ":hover",
		});
		expect(StyledButton).toHaveStyleRule("border", "2px solid transparent", {
			modifier: ":hover",
		});
	});

	it("displays a primary button when passed a 'primary' prop", () => {
		wrapper.setProps({ primary: true });
		const StyledButton = findStyledButton();

		expect(StyledButton).toHaveStyleRule("cursor", "pointer");
		expect(StyledButton).toHaveStyleRule("color", "#fff");
		expect(StyledButton).toHaveStyleRule("background-color", "#025f6d");
		expect(StyledButton).toHaveStyleRule("text-transform", "none");
		expect(StyledButton).toHaveStyleRule("border", "2px solid #025f6d");

		expect(StyledButton).toHaveStyleRule("color", "#fff", {
			modifier: ":hover",
		});
		expect(StyledButton).toHaveStyleRule("background-color", "#04515d", {
			modifier: ":hover",
		});
		expect(StyledButton).toHaveStyleRule("border", "2px solid #04515d", {
			modifier: ":hover",
		});
	});

	it("displays a danger button when passed a 'danger' prop", () => {
		wrapper.setProps({ danger: true });
		const StyledButton = findStyledButton();

		expect(StyledButton).toHaveStyleRule("cursor", "pointer");
		expect(StyledButton).toHaveStyleRule("color", "#fff");
		expect(StyledButton).toHaveStyleRule("background-color", "#f56342");
		expect(StyledButton).toHaveStyleRule("text-transform", "none");
		expect(StyledButton).toHaveStyleRule("border", "2px solid #f56342");

		expect(StyledButton).toHaveStyleRule("color", "#fff", {
			modifier: ":hover",
		});
		expect(StyledButton).toHaveStyleRule("background-color", "#d24b2e", {
			modifier: ":hover",
		});
		expect(StyledButton).toHaveStyleRule("border", "2px solid #d24b2e", {
			modifier: ":hover",
		});
	});

	it("displays a tertiary button when passed a 'tertiary' prop", () => {
		wrapper.setProps({ tertiary: true });
		const StyledButton = findStyledButton();

		expect(StyledButton).toHaveStyleRule("cursor", "pointer");
		expect(StyledButton).toHaveStyleRule("color", "#025f6d");
		expect(StyledButton).toHaveStyleRule("background-color", "#fff");
		expect(StyledButton).toHaveStyleRule("text-transform", "none");
		expect(StyledButton).toHaveStyleRule("border", "2px solid #fff");

		expect(StyledButton).toHaveStyleRule("color", "#04515d", {
			modifier: ":hover",
		});
		expect(StyledButton).toHaveStyleRule("background-color", "#d8d8d8", {
			modifier: ":hover",
		});
		expect(StyledButton).toHaveStyleRule("border", "2px solid #d8d8d8", {
			modifier: ":hover",
		});
	});

	it("disables the button when passed a 'disabled' prop", () => {
		wrapper.setProps({ disabled: true });
		const StyledButton = findStyledButton();

		expect(StyledButton).toHaveStyleRule("cursor", "not-allowed");
		expect(wrapper.find("button").prop("disabled")).toBeTruthy();
	});

	it("adds padding to the button when passed a 'padding' prop", () => {
		wrapper.setProps({ padding: "10px" });
		const StyledButton = findStyledButton();

		expect(StyledButton).toHaveStyleRule("padding", "10px");
	});

	it("changes the font-size when passed a 'fontSize' prop", () => {
		wrapper.setProps({ fontSize: "10px" });
		const StyledButton = findStyledButton();

		expect(StyledButton).toHaveStyleRule("font-size", "10px");
	});

	it("transforms the button text when passed a 'uppercase', 'lowercase', or 'capitalize' prop", () => {
		const textTransformations = ["uppercase", "lowercase", "capitalize"];

		const tansformButtonText = type => {
			const props = textTransformations.reduce((acc, name) => {
				acc[name] = name === type;

				return acc;
			}, {});

			wrapper.setProps({ ...props });
			expect(wrapper.find("StyledButton")).toHaveStyleRule(
				"text-transform",
				type,
			);
		};

		textTransformations.forEach(transformation => {
			tansformButtonText(transformation);
		});
	});
});
