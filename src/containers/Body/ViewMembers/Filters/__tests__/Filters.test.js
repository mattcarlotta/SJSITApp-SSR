import Filters from "../index";

const clearFilters = jest.fn();
const push = jest.fn();
const updateQuery = jest.fn();

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

	it("handles Status filters", () => {
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

		expect(updateQuery).toHaveBeenCalledWith({
			page: 1,
			status: "active",
		});
	});

	it("handles Role filters", () => {
		wrapper
			.find("#role")
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
			role: "staff",
		});
	});

	it("handles Email filters", () => {
		const email = "test@test.com";
		wrapper.setProps({ queries: { email } });
		const newValue = { email, page: 1 };
		wrapper
			.find("#email")
			.first()
			.simulate("click");

		wrapper
			.find("button.search")
			.first()
			.simulate("click");

		expect(updateQuery).toHaveBeenCalledWith(newValue);
	});

	it("handles First Name filters", () => {
		const firstName = "matt";
		wrapper.setProps({ queries: { firstName } });
		const newValue = { firstName, page: 1 };
		wrapper
			.find("#first-name")
			.first()
			.simulate("click");

		wrapper
			.find("button.search")
			.first()
			.simulate("click");

		expect(updateQuery).toHaveBeenCalledWith(newValue);
	});

	it("handles Last Name filters", () => {
		const lastName = "smith";
		wrapper.setProps({ queries: { lastName } });
		const newValue = { lastName, page: 1 };
		wrapper
			.find("#last-name")
			.first()
			.simulate("click");

		wrapper
			.find("button.search")
			.first()
			.simulate("click");

		expect(updateQuery).toHaveBeenCalledWith(newValue);
	});

	it("handles clearing filters", () => {
		wrapper
			.find("#clear-filters")
			.first()
			.simulate("click");

		expect(clearFilters).toHaveBeenCalledTimes(1);
	});

	it("clicking on the 'Add Member' button, moves the user to the New Member Form page", () => {
		wrapper
			.find("Button.add-member")
			.at(0)
			.simulate("click");

		expect(push).toHaveBeenCalledWith("/employee/members/create");
	});
});
