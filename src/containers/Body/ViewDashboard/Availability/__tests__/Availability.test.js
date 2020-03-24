import moment from "moment-timezone";
import { Availability } from "../index";

const fetchAvailability = jest.fn();

const eventAvailability = [
	{
		id: "available",
		label: "available",
		value: 66,
	},
];

const format = "MM/DD/YYYY";

const startOfMonth = moment().startOf("month");
const endOfMonth = moment().endOf("month");
const months = [startOfMonth.format(), endOfMonth.format()];

const initProps = {
	eventAvailability: [],
	months: [],
	fetchAvailability,
	isLoading: true,
};

const wrapper = mount(<Availability {...initProps} />);

describe("Dashboard Availability", () => {
	it("initially displays a LoadingPanel", () => {
		expect(fetchAvailability).toHaveBeenCalledTimes(1);
		expect(wrapper.find("LoadingPanel").exists()).toBeTruthy();
	});

	it("displays MemberAvailabilityAverage and months", () => {
		wrapper.setProps({ eventAvailability, months, isLoading: false });

		expect(wrapper.find(".ant-card-extra").text()).toContain(
			`${startOfMonth.format(format)} - ${endOfMonth.format(format)}`,
		);
		expect(wrapper.find("MemberAvailabilityAverage").exists()).toBeTruthy();
	});
});
