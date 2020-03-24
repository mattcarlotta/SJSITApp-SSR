import LoadingTable from "../index";

describe("Loading Table", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<LoadingTable />);
	});

	it("renders without errors", () => {
		expect(wrapper.find("LoadingTable").exists()).toBeTruthy();
		expect(wrapper.find("div.thead").exists()).toBeTruthy();
		expect(wrapper.find("div.tbody").exists()).toBeTruthy();
	});
});
