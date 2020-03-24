import ClickHandler from "../index";

const value = "test";

const eventListener = {};
document.addEventListener = (evt, cb) => (eventListener[evt] = cb);
document.removeEventListener = jest.fn();

describe("Click Handler", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(
			<div>
				<ClickHandler value={value}>
					{({ isFocused, handleBlur, handleFocus }) => (
						<div className="wrapper">
							<input
								onBlur={handleBlur}
								onFocus={handleFocus}
								className={isFocused ? "focused" : null}
							/>
						</div>
					)}
				</ClickHandler>
				<div tabIndex={0} className="outside" />
			</div>,
		);
	});

	it("renders without errors", () => {
		expect(wrapper.find("ClickHandler").exists()).toBeTruthy();
	});

	it("handles focus", () => {
		wrapper.find("input").simulate("focus");

		expect(wrapper.find("ClickHandler").state("isFocused")).toBeTruthy();
	});

	it("handles blur", () => {
		wrapper.find("input").simulate("blur");

		expect(wrapper.find("ClickHandler").state("isFocused")).toBeFalsy();
	});

	it("maintains focus when clicks are inside", () => {
		wrapper.find("input").simulate("focus");

		wrapper
			.find("ClickHandler")
			.instance()
			.handleClickOutside({
				target: wrapper.find("input").getDOMNode(),
			});

		expect(wrapper.find("ClickHandler").state("isFocused")).toBeTruthy();

		wrapper
			.find("ClickHandler")
			.instance()
			.handleClickOutside({
				target: wrapper.find("div.wrapper").getDOMNode(),
			});

		expect(wrapper.find("ClickHandler").state("isFocused")).toBeTruthy();
	});

	it("loses focus when clicks are outside", () => {
		wrapper.find("input").simulate("focus");

		wrapper
			.find("ClickHandler")
			.instance()
			.handleClickOutside({
				target: wrapper.find("div.outside").getDOMNode(),
			});

		expect(wrapper.find("ClickHandler").state("isFocused")).toBeFalsy();
	});

	it("removes the listener on unmount", () => {
		wrapper.unmount();
		expect(document.removeEventListener).toHaveBeenCalledTimes(1);
	});
});
