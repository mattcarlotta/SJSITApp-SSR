import { ViewAuthorizations } from "../index";

const deleteManyTokens = jest.fn();
const deleteToken = jest.fn();
const push = jest.fn();
const fetchTokens = jest.fn();
const resendToken = jest.fn();

const initProps = {
	deleteToken,
	deleteManyTokens,
	fetchTokens,
	location: {
		search: "?page=1",
	},
	isLoading: true,
	resendToken,
	tokens: [],
	totalDocs: 0,
	push,
};

const tokens = [
	{
		_id: "5d44a68188524202892bd82e",
		email: "member@example.com",
		authorizedEmail: "member@example.com",
		role: "member",
		seasonId: "20002001",
		token: "Iy7bjX0jMAfmfrRFtXWC79urQ2mJeLrC",
		expiration: "2019-11-01T06:59:59.999Z",
		__v: 0,
	},
	{
		_id: "5d44a68188524202892bd82f",
		email: "",
		authorizedEmail: "member2@example.com",
		role: "member2",
		seasonId: "20002001",
		token: "Iy7bjX0jMAfmfrRFtXWC79urQ2mJeLrD",
		expiration: "2019-11-01T06:59:59.999Z",
		__v: 0,
	},
];

describe("View Member Profile", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<ViewAuthorizations {...initProps} />);
	});

	it("renders without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});

	it("renders a LoadingTable", () => {
		expect(wrapper.find("LoadingTable").exists()).toBeTruthy();
	});

	it("renders an expiration date if an email is missing", () => {
		wrapper.setProps({ tokens, isLoading: false, totalDocs: 2 });
		wrapper.update();

		const emptyExpirationDate = wrapper
			.find("TableRow")
			.first()
			.find("td")
			.at(5);

		expect(emptyExpirationDate.text()).toContain("-");

		const expirationDate = wrapper
			.find("TableRow")
			.at(1)
			.find("td")
			.at(5);

		expect(expirationDate.text()).toContain("10/31/2019");
	});

	it("renders an token status", () => {
		wrapper.setProps({ tokens, isLoading: false, totalDocs: 2 });
		wrapper.update();

		expect(wrapper.find("FaUserCheck").exists()).toBeTruthy();
	});
});
