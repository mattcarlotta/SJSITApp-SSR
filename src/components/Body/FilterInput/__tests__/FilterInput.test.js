import FilterInput from "../index";

const name = "firstName";
const value = "Bob";
const updateQuery = jest.fn();

const initProps = {
	name,
	placeholder: "test",
	value: "",
	updateQuery,
};

const wrapper = mount(<FilterInput {...initProps} />);

describe("Filter Input", () => {
	it("renders without errors", () => {
		expect(wrapper.find("form").exists()).toBeTruthy();
	});

	it("updates the input with a value", () => {
		wrapper.find("input").simulate("change", { target: { name, value } });

		expect(wrapper.state(name)).toEqual(value);
	});

	it("calls updateQuery when the 'Search' button is clicked", () => {
		wrapper
			.find("Button")
			.at(0)
			.simulate("click");

		expect(updateQuery).toHaveBeenCalledWith({
			page: 1,
			[name]: value,
		});
	});

	it("clears the input and calls updateQuery when the 'Reset' button is clicked", () => {
		wrapper
			.find("Button")
			.at(1)
			.simulate("click");
		expect(wrapper.state(name)).toBeNull();
		expect(updateQuery).toHaveBeenCalledWith({
			[name]: null,
		});
	});
});
