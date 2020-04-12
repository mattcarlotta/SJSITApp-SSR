import Router from "next/router";
import { ViewSeasons } from "../index";

const data = [
	{
		_id: "5d323ee2b02dee15483e5d9f",
		seasonId: "20002001",
		startDate: "2000-10-06T07:00:00.000+00:00",
		endDate: "2001-08-06T07:00:00.000+00:00",
	},
];

const deleteSeason = jest.fn();
const deleteManySeasons = jest.fn();
const fetchSeasons = jest.fn();

const initProps = {
	data: [],
	deleteManySeasons,
	deleteSeason,
	fetchSeasons,
	isLoading: true,
	totalDocs: 0,
};

describe("View All Seasons", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = withRouterContext(ViewSeasons, initProps);
	});

	it("renders without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});

	it("clicking on the 'New Season' button, moves the user to the New Season Form page", () => {
		wrapper.find("Button").at(0).simulate("click");

		expect(Router.push).toHaveBeenCalledWith("/employee/seasons/create");
	});

	it("renders a LoadingTable", () => {
		expect(wrapper.find("LoadingTable").exists()).toBeTruthy();
	});

	it("renders FormatDate", () => {
		wrapper.setProps({ data, isLoading: false, totalDocs: 1 });
		wrapper.update();

		expect(wrapper.find("FormatDate").exists()).toBeTruthy();
	});
});
