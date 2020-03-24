import moment from "moment";
import { NewSeasonForm } from "../index";

const createSeason = jest.fn();
const push = jest.fn();

const initProps = {
	createSeason,
	push,
	serverMessage: "",
};

const name = "seasonDuration";
const startDate = moment(new Date(2000, 9, 6));
const endDate = moment(new Date(2001, 9, 6));
const value = [startDate, endDate];

const startYear = moment(startDate);
const endYear = moment(endDate);
const seasonId = `${startYear.format("YYYY")}${endYear.format("YYYY")}`;

describe("Create Season Form", () => {
	let wrapper;
	let submitForm;
	beforeEach(() => {
		wrapper = mount(<NewSeasonForm {...initProps} />);
		submitForm = () => wrapper.find("form").simulate("submit");
	});

	it("renders without errors", () => {
		expect(wrapper.find("form").exists()).toBeTruthy();
	});

	it("if there are errors, it doesn't submit the form", () => {
		submitForm();

		expect(createSeason).toHaveBeenCalledTimes(0);
	});

	it("selecting a date, calls this.handleChange", () => {
		const spy = jest.spyOn(wrapper.instance(), "handleChange");
		wrapper.instance().forceUpdate();

		// open calender
		wrapper
			.find("input.ant-calendar-range-picker-input")
			.at(0)
			.simulate("click");

		// select todays date
		wrapper
			.find("td.ant-calendar-cell.ant-calendar-today")
			.find("div")
			.at(0)
			.simulate("click");

		// select end of month date
		wrapper
			.find("td.ant-calendar-last-day-of-month")
			.at(0)
			.find("div")
			.simulate("click");

		expect(spy).toBeCalledTimes(1);
		spy.mockClear();
	});

	it("handles the seasonId based upon selected/unselected values", () => {
		wrapper.instance().handleChange({ target: { name, value: [] } });
		expect(wrapper.state().fields[0].value).toEqual("");

		wrapper.instance().handleChange({ target: { name, value } });
		expect(wrapper.state().fields[0].value).toEqual(seasonId);
	});

	describe("Form Submission", () => {
		beforeEach(() => {
			jest.useFakeTimers();

			wrapper.instance().handleChange({ target: { name, value } });

			submitForm();
			jest.runOnlyPendingTimers();
		});

		afterEach(() => {
			createSeason.mockClear();
		});

		it("selecting a start and end date, automatically fills in the seasonId field", () => {
			const input = wrapper
				.find("input")
				.findWhere(e => e.prop("name") === "seasonId");

			expect(wrapper.state().fields[0].value).toEqual(seasonId);
			expect(input.prop("value")).toEqual(seasonId);
		});

		it("submits the form after a successful validation and calls createSeason with fields", () => {
			expect(wrapper.state("isSubmitting")).toBeTruthy();
			expect(createSeason).toHaveBeenCalledWith({
				seasonId,
				seasonDuration: [startYear.format(), endYear.format()],
			});
		});

		it("on submission error, enables the form submit button", () => {
			wrapper.setProps({ serverMessage: "Example error message." });

			expect(wrapper.state("isSubmitting")).toBeFalsy();
			expect(wrapper.find("button[type='submit']").exists()).toBeTruthy();
		});
	});
});
