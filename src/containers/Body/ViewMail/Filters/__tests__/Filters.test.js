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

describe("Mail Filters", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<Filters {...initProps} />);
	});

	afterEach(() => {
		clearFilters.mockClear();
		push.mockClear();
		updateQuery.mockClear();
	});

	it("handles Send Date filters", () => {
		const runSendDateFilter = () => {
			wrapper
				.find("#send-date")
				.first()
				.simulate("click");
			wrapper
				.find(".ant-calendar-picker-input")
				.first()
				.simulate("click");
		};

		runSendDateFilter();
		wrapper
			.find(".ant-calendar-today")
			.first()
			.simulate("click");

		expect(updateQuery).toHaveBeenCalledWith({
			page: 1,
			sendDate: today,
		});

		wrapper.setProps({
			queries: {
				sendDate: moment().format(format),
			},
		});

		runSendDateFilter();

		wrapper
			.find(".anticon-close-circle")
			.first()
			.simulate("click");

		expect(updateQuery).toHaveBeenCalledWith({
			page: 1,
			sendDate: null,
		});
	});

	it("handles Email Status filters", () => {
		wrapper
			.find("#status")
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

		expect(updateQuery).toHaveBeenCalledWith({ page: 1, status: "sent" });
	});

	it("handles clearing filters", () => {
		wrapper
			.find("#clear-filters")
			.first()
			.simulate("click");

		expect(clearFilters).toHaveBeenCalledTimes(1);
	});

	it("clicking on the 'Send Mail' button, moves the user to the Send Mail Form page", () => {
		wrapper
			.find("Button.send-mail")
			.first()
			.simulate("click");

		expect(push).toHaveBeenCalledWith("/employee/mail/create");
	});
});
