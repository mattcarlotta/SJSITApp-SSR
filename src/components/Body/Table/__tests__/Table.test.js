import preloadAll from "jest-next-dynamic";
import FormatDate from "~components/Body/FormatDate";
import DisplayStatus from "~components/Body/DisplayStatus";
import Table from "../index";

const columns = [
	{
		title: "Season Id",
		dataIndex: "seasonId",
		key: "seasonId",
	},
	{
		title: "Start Date",
		dataIndex: "startDate",
		key: "startDate",
		render: date => <FormatDate format="MM/DD/YYYY" date={date} />,
	},
	{
		title: "End Date",
		dataIndex: "endDate",
		key: "endDate",
		render: date => <FormatDate format="MM/DD/YYYY" date={date} />,
	},
	{
		title: "Members",
		dataIndex: "members",
		key: "members",
	},
	{
		title: "Status",
		dataIndex: "status",
		key: "status",
		render: status => <DisplayStatus status={status} />,
	},
];

const data = [
	{
		_id: "5d323ee2b02dee15483e5d9f",
		status: "active",
		members: 3,
		seasonId: "20002001",
		startDate: "2000-10-06T07:00:00.000+00:00",
		endDate: "2001-08-06T07:00:00.000+00:00",
	},
	{
		_id: "5d323ee2b02dee15483e5d9e",
		status: "suspended",
		members: 3,
		seasonId: "20002001",
		startDate: "2000-10-06T07:00:00.000+00:00",
		endDate: "2001-08-06T07:00:00.000+00:00",
	},
];

const pathname = "/employees/seasons/viewall";

const location = {
	search: "?page=1",
	pathname,
};

const nextLocation = {
	search: "?page=2",
	pathname,
};

const deleteAction = jest.fn();
const deleteManyRecords = jest.fn();
const fetchData = jest.fn();
const sendMail = jest.fn();
const updateQuery = jest.fn();
const queries = {
	page: 1,
};

const initProps = {
	assignLocation: "seasons",
	columns,
	data: [],
	deleteAction,
	deleteManyRecords,
	editLocation: "seasons",
	fetchData,
	isLoading: true,
	location,
	sendMail,
	totalDocs: 0,
	queries,
	role: "",
	updateQuery,
	viewLocation: "seasons",
};

const nextProps = {
	assignLocation: "seasons",
	columns,
	data,
	deleteAction,
	deleteManyRecords,
	editLocation: "seasons",
	isLoading: false,
	fetchData,
	location: nextLocation,
	queries,
	role: "",
	totalDocs: 2,
	updateQuery,
	viewLocation: "seasons",
};

jest.useFakeTimers();

describe("Custom Table", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<Table {...initProps} />);
	});

	beforeAll(async () => {
		await preloadAll();
	});

	afterEach(() => {
		fetchData.mockClear();
		deleteAction.mockClear();
		deleteManyRecords.mockClear();
		sendMail.mockClear();
		updateQuery.mockClear();
		jest.runAllTimers();
	});

	it("initially displays a LoadingTable component", () => {
		expect(wrapper.find("LoadingTable").exists()).toBeTruthy();
	});

	// it("initially calls fetchData when isLoading is true", () => {
	// 	expect(fetchData).toHaveBeenCalledTimes(1);
	// });

	describe("Ant Table With Data", () => {
		beforeEach(() => {
			wrapper.setProps({ ...nextProps });
			wrapper.update();
		});

		it("displays a 8 column and 16 row Table component with data", () => {
			expect(wrapper.find("Table").exists()).toBeTruthy();
			expect(wrapper.find("th")).toHaveLength(8);
			expect(wrapper.find("td")).toHaveLength(16);
			expect(wrapper.find("td").at(1).text()).toEqual(data[0].seasonId);
			expect(wrapper.find("td").at(2).text()).toEqual("10/06/2000");
			expect(wrapper.find("td").at(3).text()).toEqual("08/06/2001");
		});

		it("handles invalid pages", () => {
			wrapper.setProps({
				isLoading: true,
			});

			wrapper.setProps({
				data: [],
				totalDocs: 10,
				queryString: "?page=500",
				isLoading: false,
			});

			expect(updateQuery).toHaveBeenCalledWith({ page: 1 });
		});

		it("handles and calls delete item or send mail actions", () => {
			wrapper.instance().handleClickAction(deleteAction, data[0]);

			expect(deleteAction).toHaveBeenCalledWith(data[0]._id);
		});

		// it("calls fetchData when the page query has been updated", () => {
		// 	wrapper.setProps({ queries: {"?page=3" });

		// 	expect(fetchData).toHaveBeenCalledTimes(2);
		// });

		it("handles selected rows", () => {
			const selectedRowKeys = ["5d323ee2b02dee15483e5d9f"];
			wrapper.instance().handleSelectChange(selectedRowKeys);

			expect(wrapper.state("selectedRowKeys")).toEqual(selectedRowKeys);
		});

		it("handles deleted selected rows", () => {
			const selectedRowKeys = ["5d323ee2b02dee15483e5d9f"];
			wrapper.setState({ selectedRowKeys });

			wrapper.instance().handleDeleteRecords(selectedRowKeys);

			expect(wrapper.state("selectedRowKeys")).toEqual([]);
			expect(deleteManyRecords).toHaveBeenCalledWith(selectedRowKeys);
		});
	});
});
