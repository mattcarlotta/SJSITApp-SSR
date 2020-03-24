import moment from "moment-timezone";
import Filters from "../index";

const clearFilters = jest.fn();
const push = jest.fn();
const updateQuery = jest.fn();
const teams = ["kings", "knights"];

const format = "MM-DD-YYYY";
const today = moment().format(format);

const initProps = {
	clearFilters,
	queries: {},
	push,
	updateQuery,
};

describe("Event Filters", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<Filters {...initProps} />);
	});

	afterEach(() => {
		clearFilters.mockClear();
		push.mockClear();
		updateQuery.mockClear();
	});

	it("handles Event Date filters", () => {
		const runEventFilter = () => {
			wrapper
				.find("#event-date")
				.first()
				.simulate("click");
			wrapper
				.find(".ant-calendar-range-picker-input")
				.first()
				.simulate("click");
		};

		runEventFilter();
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
			startDate: today,
			endDate: today,
		});

		wrapper.setProps({
			queries: {
				startDate: moment().format(format),
				endDate: moment().format(format),
			},
		});

		runEventFilter();

		wrapper
			.find(".anticon-close-circle")
			.first()
			.simulate("click");

		expect(updateQuery).toHaveBeenCalledWith({
			page: 1,
			startDate: null,
			endDate: null,
		});
	});

	it("handles Event Type filters", () => {
		wrapper
			.find("#event-type")
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

		expect(updateQuery).toHaveBeenCalledWith({ page: 1, type: "game" });
	});

	it("handles Team filters", () => {
		wrapper
			.find("#team")
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

		expect(updateQuery).toHaveBeenCalledWith({ page: 1, team: "sharks" });
	});

	it("handles Opponent filters", () => {
		const runOpponentFilter = () => {
			wrapper
				.find("#opponent")
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
		};

		runOpponentFilter();

		expect(updateQuery).toHaveBeenCalledTimes(0);

		wrapper.setProps({ teams });

		runOpponentFilter();

		expect(updateQuery).toHaveBeenCalledWith({ page: 1, opponent: "kings" });
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

		expect(updateQuery).toHaveBeenCalledWith({
			page: 1,
			sentEmailReminders: "sent",
		});
	});

	it("handles clearing filters", () => {
		wrapper
			.find("#clear-filters")
			.first()
			.simulate("click");

		expect(clearFilters).toHaveBeenCalledTimes(1);
	});

	it("clicking on the 'Add Event' button, moves the user to the New Event Form page", () => {
		wrapper
			.find("Button.add-event")
			.first()
			.simulate("click");

		expect(push).toHaveBeenCalledWith("/employee/events/create");
	});
});
