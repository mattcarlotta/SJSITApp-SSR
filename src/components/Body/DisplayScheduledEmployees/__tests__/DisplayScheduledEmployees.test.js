import DisplayScheduledEmployees, { showFullList } from "../index";

const employees = [
	{
		_id: "88",
		firstName: "Matt",
		lastName: "Carlotta",
	},
	{
		_id: "99",
		firstName: "Bob",
		lastName: "Dole",
	},
];

const initProps = {
	employees: [],
};

const wrapper = mount(<DisplayScheduledEmployees {...initProps} />);

describe("Display Scheduled Employees", () => {
	it("renders an array length with 0", () => {
		expect(wrapper.find("span").exists()).toBeTruthy();
		expect(wrapper.find("span").text()).toEqual("0");
	});

	it("renders an array length with 2", () => {
		wrapper.setProps({ employees });
		expect(wrapper.find("span").exists()).toBeTruthy();
		expect(wrapper.find("span").text()).toEqual("2");
	});

	it("the tooltip displays a empty list of employees", () => {
		const node = showFullList([]);

		expect(node).toEqual(<span>(none)</span>);
	});

	it("the tooltip displays a list of employees", () => {
		const nodes = showFullList(employees);

		expect(nodes).toHaveLength(2);
	});
});
