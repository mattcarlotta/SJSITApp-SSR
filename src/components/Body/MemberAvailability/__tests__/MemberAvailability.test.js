import MemberAvailability from "../index";

const fetchAction = jest.fn();

const memberResponseCount = [
	{
		id: "I want to work.",
		label: "I want to work.",
		color: "#247BA0",
		value: 0,
	},
	{
		id: "Available to work.",
		label: "Available to work.",
		color: "#2A9D8F",
		value: 0,
	},
	{
		id: "Prefer not to work.",
		label: "Prefer not to work.",
		color: "#F4A261",
		value: 0,
	},
	{
		id: "Not available to work.",
		label: "Not available to work.",
		color: "#FF8060",
		value: 0,
	},
	{
		id: "No response.",
		label: "No response.",
		color: "#BFBFBF",
		value: 5,
	},
];

const memberScheduleEvents = [
	{
		id: "scheduled",
		events: 0,
	},
	{
		id: "available",
		events: 5,
	},
];
const eventAvailability = [
	{
		id: "available",
		label: "available",
		value: 100,
	},
	{
		id: "unavailable",
		label: "unavailable",
		value: 0,
	},
];

const memberAvailability = {
	eventAvailability,
	memberResponseCount,
	memberScheduleEvents,
};

const initProps = {
	id: "",
	fetchAction,
	memberAvailability: {},
};

const initState = {
	selectedMonth: "Oct",
	selectedYear: 2019,
	years: [2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022, 2023, 2024],
};

describe("MemberAvailability", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<MemberAvailability {...initProps} />);
		wrapper.setState({ ...initState });
		wrapper.update();
	});

	it("initally renders without errors", () => {
		expect(wrapper.find("ScheduleHeader").exists()).toBeTruthy();
		expect(wrapper.find("Empty").exists()).toBeTruthy();
	});

	describe("With Data", () => {
		beforeEach(() => {
			wrapper.setProps({ memberAvailability });
		});

		it("handles break points", () => {
			wrapper.setState({
				windowWidth: 1500,
				breakpoint: true,
				squishpoint: false,
			});
		});

		it("handles squish points", () => {
			wrapper.setState({
				windowWidth: 300,
				breakpoint: false,
				squishpoint: true,
			});
		});

		it("renders a pie and bar chart", () => {
			expect(wrapper.find("ResponsivePie").exists()).toBeTruthy();
			expect(wrapper.find("ResponsiveBar").exists()).toBeTruthy();
		});

		it("calls fetchAction when a selection is made", () => {
			const name = "selectedMonth";
			const selectedMonth = "Sept";
			wrapper.instance().handleSelection({ name, value: selectedMonth });

			expect(wrapper.state("selectedMonth")).toEqual(selectedMonth);
			expect(fetchAction).toHaveBeenCalledWith({
				id: "",
				selectedDate: "2019-09-01T00:00:00-07:00",
			});
		});
	});
});
