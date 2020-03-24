import moment from "moment-timezone";
import { Select } from "antd";
import ScheduleHeader from "../index";

const handleSelection = jest.fn();
const onChange = jest.fn();
const months = moment.monthsShort();
const years = [
	...Array(11)
		.fill()
		.map(
			(_, key) =>
				parseInt(
					moment()
						.subtract(5, "year")
						.format("YYYY"),
					10,
				) + key,
		),
];
const value = moment("Aug 2019", "MMM YYYY");

const initProps = {
	id: "",
	handleSelection,
	months,
	selectedGames: "All Games",
	selectedMonth: "Aug",
	selectedYear: 2019,
	role: "employee",
	onChange,
	years,
	value,
};

describe("Name of the group", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<ScheduleHeader {...initProps} />);
	});

	afterEach(() => {
		handleSelection.mockClear();
	});

	it("renders without errors", () => {
		expect(wrapper.find("FlexEnd").exists()).toBeTruthy();
	});

	it("initially renders 3 Select components", () => {
		expect(wrapper.find(Select)).toHaveLength(3);
	});

	it("calls handleSelection when 'selectedGames' option is selected", () => {
		jest.useFakeTimers();

		wrapper
			.find(Select)
			.first()
			.simulate("click");

		jest.runAllTimers();

		wrapper
			.find("li.ant-select-dropdown-menu-item")
			.at(1)
			.simulate("click");

		expect(handleSelection).toHaveBeenCalledWith({
			calendarDate: value,
			name: "selectedGames",
			updateCalendarDate: onChange,
			value: "My Games",
		});
	});

	it("renders 12 months and calls handleSelection when 'selectedMonth' option is selected", () => {
		jest.useFakeTimers();

		wrapper
			.find(Select)
			.at(1)
			.simulate("click");

		jest.runAllTimers();

		wrapper
			.find("li.ant-select-dropdown-menu-item")
			.at(0)
			.simulate("click");

		expect(wrapper.find("ul.ant-select-dropdown-menu").find("li")).toHaveLength(
			12,
		);

		expect(handleSelection).toHaveBeenCalledWith({
			calendarDate: value,
			name: "selectedMonth",
			updateCalendarDate: onChange,
			value: "Jan",
		});
	});

	it("renders 2 Select components when an 'id' is present", () => {
		wrapper.setProps({ id: "123456789" });
		expect(wrapper.find(Select)).toHaveLength(2);
	});

	it("renders 5+- years from current year and calls handleSelection when 'selectedYear' option is selected", () => {
		jest.useFakeTimers();

		wrapper
			.find(Select)
			.at(2)
			.simulate("click");

		jest.runAllTimers();

		wrapper
			.find("li.ant-select-dropdown-menu-item")
			.at(0)
			.simulate("click");

		expect(wrapper.find("ul.ant-select-dropdown-menu").find("li")).toHaveLength(
			11,
		);

		expect(handleSelection).toHaveBeenCalledWith({
			calendarDate: value,
			name: "selectedYear",
			updateCalendarDate: onChange,
			value: parseInt(
				moment()
					.subtract(5, "years")
					.format("YYYY"),
				10,
			),
		});
	});
});
