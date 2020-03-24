import UserContainer from "../index";

const initProps = {
	isDraggingOver: false,
};

describe("User Container", () => {
	let wrapper;
	let findStyledUserContainer;
	beforeEach(() => {
		wrapper = mount(<UserContainer {...initProps} />);
		findStyledUserContainer = () => wrapper.find("UserContainer");
	});

	it("renders without errors", () => {
		expect(wrapper.find("UserContainer").exists()).toBeTruthy();
	});

	it("initially displays an unselected User", () => {
		const StyledUserContainer = findStyledUserContainer();
		expect(StyledUserContainer).toHaveStyleRule("background-color", "#ebecf0");
	});

	it("displays a selected User", () => {
		wrapper.setProps({ isDraggingOver: true });

		const StyledUserContainer = findStyledUserContainer();
		expect(StyledUserContainer).toHaveStyleRule("background-color", "#ffebe6");
	});
});
