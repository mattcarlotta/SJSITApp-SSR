import FilterButton from "../index";

const initProps = {
	content: <span>Hello</span>,
	title: "Hello",
	value: "",
};

const wrapper = mount(<FilterButton {...initProps} />);

describe("Filter Button", () => {
	it("initially renders an unselected filter", () => {
		expect(wrapper.find("FaRegSquare").exists()).toBeTruthy();
	});

	it("initially renders a selected filter", () => {
		wrapper.setProps({ value: "selected" });

		expect(wrapper.find("FaCheckSquare").exists()).toBeTruthy();
	});
});
