import { ViewMembers } from "../index";

const data = [
	{
		_id: "5d323ee2b02dee15483e5d9f",
		role: "member",
		status: "active",
		registered: "2000-10-06T07:00:00.000+00:00",
		email: "member@example.com",
		emailReminders: true,
		firstName: "Beta",
		lastName: "Tester",
	},
	{
		_id: "5d323ee2b02dee15483e5d9e",
		role: "member",
		status: "suspended",
		registered: "2000-10-06T07:00:00.000+00:00",
		email: "member@example.com",
		emailReminders: false,
		firstName: "Beta",
		lastName: "Tester",
	},
];

const deleteMember = jest.fn();
const deleteManyMembers = jest.fn();
const fetchMembers = jest.fn();
const push = jest.fn();

const initProps = {
	data: [],
	deleteManyMembers,
	deleteMember,
	fetchMembers,
	isLoading: true,
	location: {
		search: "?page=1",
	},
	push,
	totalDocs: 0,
};

const wrapper = mount(<ViewMembers {...initProps} />);
describe("View All Members", () => {
	it("renders without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});

	it("renders a LoadingTable", () => {
		expect(wrapper.find("LoadingTable").exists()).toBeTruthy();
	});

	it("renders DisplayStatus and FormatDate", () => {
		wrapper.setProps({ data, isLoading: false, totalDocs: 1 });
		wrapper.update();

		expect(wrapper.find("DisplayStatus").exists()).toBeTruthy();
		expect(wrapper.find("FormatDate").exists()).toBeTruthy();
	});
});
