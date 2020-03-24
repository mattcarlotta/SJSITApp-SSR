import moment from "moment-timezone";
import Filters from "../index";

const clearFilters = jest.fn();
const push = jest.fn();
const updateQuery = jest.fn();

const format = "MM-DD-YYYY";
const today = moment().format(format);

const initProps = {
	clearFilters,
	queries: {},
	push,
	updateQuery,
};

describe("Form Filters", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<Filters {...initProps} />);
	});

	afterEach(() => {
		clearFilters.mockClear();
		push.mockClear();
		updateQuery.mockClear();
	});

	it("handles Season Id filters", () => {
		const seasonId = "20192020";
		wrapper.setProps({ queries: { seasonId } });
		const newValue = { seasonId, page: 1 };
		wrapper
			.find("#seasonid")
			.first()
			.simulate("click");

		wrapper
			.find("button.search")
			.first()
			.simulate("click");

		expect(updateQuery).toHaveBeenCalledWith(newValue);
	});

	it("handles Month Dates filters", () => {
		const runMonthFilter = () => {
			wrapper
				.find("#month-dates")
				.first()
				.simulate("click");
			wrapper
				.find(".ant-calendar-range-picker-input")
				.first()
				.simulate("click");
		};

		runMonthFilter();
		wrapper
			.find(".ant-calendar-today")
			.first()
			.simulate("click");
		wrapper
			.find(".ant-calendar-today")
			.first()
			.simulate("click");

		expect(updateQuery).toHaveBeenCalledWith({
			page: 1,
			startMonth: today,
			endMonth: today,
		});

		wrapper.setProps({
			queries: {
				startMonth: moment().format(format),
				endMonth: moment().format(format),
			},
		});

		runMonthFilter();

		wrapper
			.find(".anticon-close-circle")
			.first()
			.simulate("click");

		expect(updateQuery).toHaveBeenCalledWith({
			page: 1,
			startMonth: null,
			endMonth: null,
		});
	});

	it("handles Expiration Date filters", () => {
		const runExpDateFilter = () => {
			wrapper
				.find("#expiration-date")
				.first()
				.simulate("click");
			wrapper
				.find(".ant-calendar-picker-input")
				.first()
				.simulate("click");
		};

		runExpDateFilter();
		wrapper
			.find(".ant-calendar-today")
			.first()
			.simulate("click");

		expect(updateQuery).toHaveBeenCalledWith({
			page: 1,
			expirationDate: today,
		});

		wrapper.setProps({
			queries: {
				expirationDate: moment().format(format),
			},
		});

		runExpDateFilter();

		wrapper
			.find(".anticon-close-circle")
			.first()
			.simulate("click");

		expect(updateQuery).toHaveBeenCalledWith({
			page: 1,
			expirationDate: null,
		});
	});

	it("handles Email Status filters", () => {
		wrapper
			.find("#sent-emails")
			.first()
			.simulate("click");
		wrapper
			.find(".ant-select")
			.first()
			.simulate("click");
		wrapper
			.find(".ant-select-dropdown-menu-item")
			.first()
			.simulate("click");

		expect(updateQuery).toHaveBeenCalledWith({ page: 1, sentEmails: "sent" });
	});

	it("handles clearing filters", () => {
		wrapper
			.find("#clear-filters")
			.first()
			.simulate("click");

		expect(clearFilters).toHaveBeenCalledTimes(1);
	});

	it("clicking on the 'Create AP Form' button, moves the user to the New Form page", () => {
		wrapper
			.find("Button.create-ap-form")
			.at(0)
			.simulate("click");

		expect(push).toHaveBeenCalledWith("/employee/forms/create");
	});
});
