import MemberAvailability from "../index";

const goodEventAvailability = [
	{
		id: "available",
		label: "available",
		value: 75,
	},
	{
		id: "unavailable",
		label: "unavailable",
		value: 25,
	},
];

const poorEventAvailability = [
	{
		id: "available",
		label: "available",
		value: 55,
	},
	{
		id: "unavailable",
		label: "unavailable",
		value: 45,
	},
];

const initProps = {
	eventAvailability: [],
};

const wrapper = mount(<MemberAvailability {...initProps} />);

describe("Member Availability", () => {
	it("initally renders NoAvailability", () => {
		expect(wrapper.find("NoAvailability").exists()).toBeTruthy();
	});

	it("renders a blue Pie Chart when 3/4 availability is met", () => {
		wrapper.setProps({ eventAvailability: goodEventAvailability });

		expect(wrapper.find("ResponsivePie").exists()).toBeTruthy();
	});

	it("renders a red Pie Chart when 3/4 availability is not met", () => {
		wrapper.setProps({ eventAvailability: poorEventAvailability });

		expect(wrapper.find("ResponsivePie").exists()).toBeTruthy();
	});
});
