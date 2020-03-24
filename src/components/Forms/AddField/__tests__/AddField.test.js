import AddField from "../index";

const onClick = jest.fn();

const initProps = {
	onClick,
	text: "test",
};

describe("Add Field", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<AddField {...initProps} />);
	});

	it("renders without errors", () => {
		expect(wrapper.find("button").exists()).toBeTruthy();
		expect(wrapper.find("span").text()).toEqual("test");
	});

	it("calls onClick", () => {
		wrapper.find("button").simulate("click");

		expect(onClick).toHaveBeenCalledTimes(1);
	});
});
