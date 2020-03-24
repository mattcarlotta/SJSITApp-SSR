import EmailPreview from "../index";

const initProps = {
	fields: {
		message: "<span>Test</span>",
		sendTo: ["test@test.com"],
		sendFrom: "test@test.com",
		sendDate: "2019-10-09T00:27:30.000+00:00",
		subject: "Test",
	},
	handleCloseModal: jest.fn(),
	isSubmitting: false,
	submitTitle: "Submit",
};

const wrapper = HOCWrap(EmailPreview, initProps);

describe("Email Preview", () => {
	it("renders without errors", () => {
		expect(wrapper.find("Modal").exists()).toBeTruthy();
	});
});
