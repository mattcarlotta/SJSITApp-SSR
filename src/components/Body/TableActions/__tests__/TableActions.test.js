import Router from "next/router";
import TableActions from "../index";

const record = {
	_id: "5d323ee2b02dee15483e5d9f",
	status: "active",
	members: 3,
	seasonId: "20002001",
	startDate: "2000-10-06T07:00:00.000+00:00",
	endDate: "2001-08-06T07:00:00.000+00:00",
};

const assignLocation = "seasons";
const deleteAction = jest.fn();
const handleDeleteRecords = jest.fn();
const editLocation = "seasons";
const handleClickAction = jest.fn();
const sendMail = jest.fn();
const viewLocation = "seasons";

const initProps = {
	assignLocation,
	deleteAction,
	editLocation,
	handleClickAction,
	handleDeleteRecords,
	record,
	sendMail,
	viewLocation,
};

describe("Table Actions", () => {
	let wrapper;

	beforeEach(() => {
		wrapper = mount(<TableActions {...initProps} />);
	});

	afterEach(() => {
		handleClickAction.mockClear();
		handleDeleteRecords.mockClear();
		Router.push.mockClear();
	});

	it("views and assigns the selected record", () => {
		wrapper.find("button").first().simulate("click");

		expect(Router.push).toHaveBeenCalledWith(
			"/employee/seasons/assign/[id]",
			"/employee/seasons/assign/5d323ee2b02dee15483e5d9f",
		);
	});

	it("views the selected record", () => {
		wrapper.find("button").at(1).simulate("click");

		expect(Router.push).toHaveBeenCalledWith(
			"/employee/seasons/view/[id]",
			"/employee/seasons/view/5d323ee2b02dee15483e5d9f",
		);
	});

	it("edits the selected record", () => {
		wrapper.find("button").at(2).simulate("click");

		expect(Router.push).toHaveBeenCalledWith(
			"/employee/seasons/edit/[id]",
			"/employee/seasons/edit/5d323ee2b02dee15483e5d9f",
		);
	});

	it("sends an email according to the selected record", () => {
		wrapper.find("button").at(3).simulate("click");

		expect(handleClickAction).toHaveBeenCalledWith(sendMail, record);
	});

	it("deletes the selected record", () => {
		wrapper.find("button").at(4).simulate("click");

		wrapper
			.find("div.ant-popover-buttons")
			.find("button.ant-btn-primary")
			.simulate("click");

		expect(handleClickAction).toHaveBeenCalledWith(deleteAction, record);
	});

	it("deletes all selected records", () => {
		const selectedRowKeys = ["01", "02", "03"];
		wrapper.setProps({ selectedRowKeys });
		wrapper.find("button").at(5).simulate("click");

		wrapper
			.find("div.ant-popover-buttons")
			.find("button.ant-btn-primary")
			.simulate("click");

		expect(handleDeleteRecords).toHaveBeenCalledWith(selectedRowKeys);
	});
});
