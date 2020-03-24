import { ViewMail } from "../index";

const deleteMail = jest.fn();
const deleteManyMails = jest.fn();
const push = jest.fn();
const fetchMails = jest.fn();
const resendMail = jest.fn();

const initProps = {
	data: [],
	deleteMail,
	deleteManyMails,
	fetchMails,
	isLoading: true,
	location: {
		search: "?page=1",
	},
	push,
	totalDocs: 0,
	resendMail,
};

const data = [
	{
		_id: "5d44a68188524202892bd82e",
		message: "<p>Hello</p>",
		sendTo: ["member@example.com"],
		sendFrom: "test@test.com",
		sendDate: "2019-11-01T06:59:59.999Z",
		status: "sent",
		subject: "Testing",
	},
];

describe("View Mail", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<ViewMail {...initProps} />);
	});

	it("renders without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});

	it("renders a LoadingTable", () => {
		expect(wrapper.find("LoadingTable").exists()).toBeTruthy();
	});

	it("renders an EmailStatus, DisplaySendToList, and FormatDate", () => {
		wrapper.setProps({ data, isLoading: false, totalDocs: 1 });
		wrapper.update();

		expect(wrapper.find("EmailStatus").exists()).toBeTruthy();
		expect(wrapper.find("DisplaySendToList").exists()).toBeTruthy();
		expect(wrapper.find("FormatDate").exists()).toBeTruthy();
	});
});
