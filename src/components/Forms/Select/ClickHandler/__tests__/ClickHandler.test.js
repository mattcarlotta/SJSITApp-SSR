import ClickHandler from "../index";

const onChange = jest.fn();

const event = {
	target: {
		name: "test",
		value: "test",
	},
};

const clearValue = {
	target: {
		name: "test",
		value: "",
	},
};

const eventListener = {};
document.addEventListener = (evt, cb) => (eventListener[evt] = cb);
document.removeEventListener = jest.fn();

describe("Click Handler", () => {
	let openMenu;
	let wrapper;
	beforeEach(() => {
		wrapper = mount(
			<div>
				<ClickHandler onChange={onChange}>
					{({
						isVisible,
						handleInputChange,
						handleSelectClick,
						handleOptionSelect,
						handleSearchClear,
						searchText,
					}) => (
						<div className="wrapper">
							<input
								type="text"
								value={searchText}
								onChange={handleInputChange}
							/>
							<button
								type="button"
								className="clear"
								onClick={() => handleSearchClear(clearValue)}
							>
								Clear Search
							</button>
							{isVisible ? (
								<div
									tabIndex={0}
									className="options"
									onClick={() => handleOptionSelect(event)}
								/>
							) : (
								<div
									tabIndex={0}
									className="menu"
									onClick={handleSelectClick}
								/>
							)}
						</div>
					)}
				</ClickHandler>
				<div tabIndex={0} className="outside" />
			</div>,
		);
		openMenu = () => wrapper.find("div.menu").simulate("click");
	});

	afterEach(() => {
		onChange.mockClear();
	});

	it("renders without errors", () => {
		expect(wrapper.find("div.clickhandler").exists()).toBeTruthy();
	});

	it("initially displays a menu", () => {
		expect(wrapper.find("div.menu").exists()).toBeTruthy();
	});

	it("handles open/close menu left clicks", () => {
		openMenu();

		expect(wrapper.find("ClickHandler").state("isVisible")).toBeTruthy();

		wrapper.find("div.options").simulate("click");

		expect(wrapper.find("ClickHandler").state("isVisible")).toBeFalsy();
		expect(onChange).toHaveBeenCalledTimes(1);

		openMenu();

		wrapper
			.find("ClickHandler")
			.instance()
			.handleClickOutside({
				target: wrapper.find("div.outside").getDOMNode(),
			});

		expect(wrapper.find("ClickHandler").state("isVisible")).toBeFalsy();
	});

	it("handles open/close menu tab presses", () => {
		wrapper
			.find("ClickHandler")
			.instance()
			.handleTabPress({
				key: "Tab",
				target: wrapper.find("div.menu").getDOMNode(),
			});

		expect(wrapper.find("ClickHandler").state("isVisible")).toBeTruthy();

		wrapper
			.find("ClickHandler")
			.instance()
			.handleTabPress({
				key: "Tab",
				target: wrapper.find("div.outside").getDOMNode(),
			});

		expect(wrapper.find("ClickHandler").state("isVisible")).toBeFalsy();
	});

	it("doesn't change the menu state if a left is on the wrapper", () => {
		openMenu();

		wrapper
			.find("ClickHandler")
			.instance()
			.handleClickOutside({
				target: wrapper.find("div.wrapper").getDOMNode(),
			});

		expect(wrapper.find("ClickHandler").state("isVisible")).toBeTruthy();

		wrapper
			.find("ClickHandler")
			.instance()
			.handleClickOutside({
				target: wrapper.find("div.outside").getDOMNode(),
			});

		expect(wrapper.find("ClickHandler").state("isVisible")).toBeFalsy();
	});

	it("doesn't change the menu state if another key was pressed on the menu", () => {
		openMenu();

		wrapper
			.find("ClickHandler")
			.instance()
			.handleTabPress({
				key: "Enter",
				target: wrapper.find("div.wrapper").getDOMNode(),
			});

		expect(wrapper.find("ClickHandler").state("isVisible")).toBeTruthy();

		wrapper
			.find("ClickHandler")
			.instance()
			.handleTabPress({
				key: "Tab",
				target: wrapper.find("div.wrapper").getDOMNode(),
			});

		expect(wrapper.find("ClickHandler").state("isVisible")).toBeTruthy();
	});

	it("updates searchText with a value and opens the options menu", () => {
		const value = "hello";
		wrapper.find("input").simulate("change", { target: { value } });

		expect(wrapper.find("input").props().value).toEqual(value);
		expect(wrapper.find("ClickHandler").state("searchText")).toEqual(value);
		expect(wrapper.find("ClickHandler").state("isVisible")).toBeTruthy();
	});

	it("clears searchText when a button is clicked and calls onChange with props", () => {
		wrapper.find("input").simulate("change", { target: { value: "hello" } });

		wrapper.find("button").simulate("click");

		expect(wrapper.find("ClickHandler").state("searchText")).toEqual("");
		expect(onChange).toHaveBeenCalledWith(clearValue);
	});

	it("removes the event listeners on unmount", () => {
		wrapper.unmount();
		expect(document.removeEventListener).toHaveBeenCalledTimes(2);
	});
});
