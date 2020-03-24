import { ViewForms } from "../index";

const data = [
	{
		_id: "5d54769658ae8d57e19a1ecc",
		seasonId: "20192020",
		startMonth: "2019-08-01T07:00:00.000Z",
		endMonth: "2019-09-01T06:59:59.000Z",
		expirationDate: "2019-08-08T06:59:00.000Z",
		notes: "",
		sendEmailNotificationsDate: "2019-08-08T06:59:00.000Z",
		sentEmails: false,
	},
];

const deleteForm = jest.fn();
const deleteManyForms = jest.fn();
const fetchForms = jest.fn();
const resendMail = jest.fn();
const push = jest.fn();

const initProps = {
	data: [],
	deleteForm,
	deleteManyForms,
	fetchForms,
	isLoading: true,
	location: {
		search: "?page=1",
	},
	push,
	resendMail,
	totalDocs: 0,
};

describe("View All Forms", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<ViewForms {...initProps} />);
	});

	it("renders without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});

	it("renders a LoadingTable", () => {
		expect(wrapper.find("LoadingTable").exists()).toBeTruthy();
	});

	it("renders FormatDate and DisplayEmailReminder", () => {
		wrapper.setProps({ data, isLoading: false, totalDocs: 1 });
		wrapper.update();

		expect(wrapper.find("FormatDate").exists()).toBeTruthy();
		expect(wrapper.find("FaStopwatch").exists()).toBeTruthy();
	});
});
