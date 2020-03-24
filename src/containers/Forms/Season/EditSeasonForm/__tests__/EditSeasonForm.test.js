import moment from "moment-timezone";
import { EditSeasonForm } from "../index";

const seasonId = "20002001";
const editSeason = {
	_id: "123456789",
	seasonId,
	startDate: new Date(2000, 9, 6),
	endDate: new Date(2001, 7, 6),
};
const fetchSeason = jest.fn();
const goBack = jest.fn();
const updateSeason = jest.fn();

const initProps = {
	match: {
		params: {
			id: seasonId,
		},
	},
	editSeason: {},
	fetchSeason,
	isLoading: true,
	goBack,
	serverMessage: "",
	updateSeason,
};

const name = "seasonDuration";
const newStartDate = moment(new Date(2002, 9, 6));
const newEndDate = moment(new Date(2003, 9, 6));
const newValue = [newStartDate, newEndDate];

const newStartYear = moment(newStartDate);
const newEndYear = moment(newEndDate);
const newSeasonId = `${newStartYear.format("YYYY")}${newEndYear.format(
	"YYYY",
)}`;

describe("Edit Season Form", () => {
	let wrapper;
	let submitForm;
	beforeEach(() => {
		wrapper = mount(<EditSeasonForm {...initProps} />);
		submitForm = () => wrapper.find("form").simulate("submit");
	});

	afterEach(() => {
		fetchSeason.mockClear();
	});

	it("renders without errors", () => {
		expect(wrapper.find("form").exists()).toBeTruthy();
	});

	it("shows a LoadingForm when fetching seasonIds and the token to edit", () => {
		expect(wrapper.find("LoadingForm").exists()).toBeTruthy();
	});

	it("initially calls fetchSeason when isLoading is true", () => {
		expect(fetchSeason).toHaveBeenCalledWith(seasonId);
	});

	describe("Form has been loaded", () => {
		beforeEach(() => {
			wrapper.setProps({ editSeason, isLoading: false });
		});

		it("enables the inputs and submit button", () => {
			expect(
				wrapper
					.find("input.ant-calendar-range-picker-input")
					.first()
					.props().disabled,
			).toBeFalsy();
			expect(
				wrapper
					.find("button")
					.at(1)
					.props().disabled,
			).toBeFalsy();
		});

		it("initially sets the seasonId, handles changes based upon selected values, and resets to prop values when cleared", () => {
			expect(wrapper.state("seasonId")).toEqual(seasonId);

			wrapper.instance().handleChange({ target: { name, value: newValue } });
			expect(wrapper.state("seasonId")).toEqual("20022003");

			wrapper.instance().handleChange({ target: { name, value: [] } });
			expect(wrapper.state("seasonId")).toEqual(seasonId);
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
				.find("td.ant-calendar-selected-day")
				.at(0)
				.find("div")
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

		describe("Dates have been updated and form has been submitted", () => {
			beforeEach(() => {
				jest.useFakeTimers();

				wrapper.instance().handleChange({ target: { name, value: newValue } });

				submitForm();
				jest.runOnlyPendingTimers();
			});

			afterEach(() => {
				updateSeason.mockClear();
			});

			it("successful validation calls updateSeason with fields", () => {
				expect(wrapper.state("isSubmitting")).toBeTruthy();
				expect(updateSeason).toHaveBeenCalledWith({
					_id: "123456789",
					seasonId: newSeasonId,
					seasonDuration: [newStartYear.format(), newEndYear.format()],
				});
			});

			it("on submission error, enables the form submit button", () => {
				wrapper.setProps({ serverMessage: "Example error message." });

				expect(wrapper.state("isSubmitting")).toBeFalsy();
				expect(wrapper.find("button[type='submit']").exists()).toBeTruthy();
			});
		});
	});
});
