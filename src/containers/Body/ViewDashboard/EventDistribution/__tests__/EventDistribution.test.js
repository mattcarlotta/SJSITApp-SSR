import moment from "moment-timezone";
import { EventDistribution } from "../index";

const fetchEventDistribution = jest.fn();

const members = [
	{
		name: "Matt Carlotta",
		"Event Count": 1,
	},
];

const startOfMonth = moment().startOf("month");
const endOfMonth = moment().endOf("month");

const initProps = {
	members,
	fetchEventDistribution,
};

describe("Dashboard Event Distribution", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<EventDistribution {...initProps} />);
	});

	it("initially displays a MemberEventCountChart", () => {
		expect(fetchEventDistribution).toHaveBeenCalledWith({
			startDate: startOfMonth.format(),
			endDate: endOfMonth.format(),
		});
		expect(wrapper.find("MemberEventCountChart").exists()).toBeTruthy();
	});

	it("handles the selected option", () => {
		const startDate = moment("2019-09-01T06:59:59.000Z");
		const endDate = moment("2019-10-01T06:59:59.000Z");
		const dates = [startDate, endDate];

		wrapper.instance().handleSelection(dates);

		expect(fetchEventDistribution).toHaveBeenCalledWith({
			startDate: startDate.format(),
			endDate: endDate.format(),
		});
	});
});
