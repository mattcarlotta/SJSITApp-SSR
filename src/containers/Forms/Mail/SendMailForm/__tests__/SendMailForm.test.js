import { SendMailForm } from "../index";

const createMail = jest.fn();
const fetchMemberNames = jest.fn();
const push = jest.fn();

const memberNames = [
	{
		_id: "5d83d5b32bff0853d6539cb6",
		email: "Bobby Axelrod <member10@example.com>",
	},
	{
		_id: "5d83d5b32bff0853d6539cb7",
		email: "Alisha Jones <member9@example.com>",
	},
];

const initProps = {
	createMail,
	fetchMemberNames,
	memberNames: [],
	push,
	serverMessage: "",
};

const updatedValues = [
	{
		name: "sendTo",
		value: ["Bobby Axelrod <member10@example.com>"],
	},
	{
		name: "subject",
		value: "Test",
	},
	{
		name: "message",
		value: "<span>Test</span>",
	},
];

Object.defineProperty(global.document, "getSelection", { value: jest.fn() });

describe("Send Mail Form", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = HOCWrap(SendMailForm, initProps);
	});

	afterEach(() => {
		createMail.mockClear();
		fetchMemberNames.mockClear();
	});

	it("renders without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});

	it("shows a LoadingForm when fetching names", () => {
		expect(wrapper.find("LoadingForm").exists()).toBeTruthy();
	});

	it("calls fetchMemberNames on mount", () => {
		expect(fetchMemberNames).toHaveBeenCalledTimes(1);
	});

	describe("Form Initializied", () => {
		beforeEach(() => {
			wrapper.setProps({ memberNames });
			wrapper.update();
		});

		it("initializes the fields and sets isLoading to false", () => {
			expect(wrapper.find("SendMailForm").state("isLoading")).toBeFalsy();
		});

		it("updates a field value when changed", () => {
			const name = "subject";
			const newValue = "Hello";
			wrapper
				.find("SendMailForm")
				.instance()
				.handleChange({ target: { name, value: newValue } });
			wrapper.update();

			expect(
				wrapper
					.find("input")
					.at(6)
					.props().value,
			).toEqual(newValue);
		});

		it("opens and closes a preview email modal", () => {
			wrapper.find("button.preview").simulate("click");

			expect(wrapper.find("SendMailForm").state("showPreview")).toBeTruthy();
			expect(wrapper.find("EmailPreview").exists()).toBeTruthy();

			wrapper.find("button#close-modal").simulate("click");
			expect(wrapper.find("SendMailForm").state("showPreview")).toBeFalsy();
			expect(wrapper.find("EmailPreview").exists()).toBeFalsy();
		});

		it("doesn't submit the form if a field has errors", () => {
			wrapper.find("form").simulate("submit");
			expect(createMail).toHaveBeenCalledTimes(0);
		});

		describe("Form Submission", () => {
			beforeEach(() => {
				updatedValues.forEach(({ name, value }) => {
					wrapper
						.find("SendMailForm")
						.instance()
						.handleChange({ target: { name, value } });
				});
				wrapper.update();
				wrapper.find("form").simulate("submit");
			});

			it("successful validation calls updateEvent with fields", () => {
				expect(wrapper.find("SendMailForm").state("isSubmitting")).toBeTruthy();
				expect(createMail).toHaveBeenCalledWith({
					sendTo: ["Bobby Axelrod <member10@example.com>"],
					sendFrom: "San Jose Sharks Ice Team <noreply@sjsiceteam.com>",
					sendDate: "",
					subject: "Test",
					message: "<p>Test</p>",
				});
			});

			it("on submission error, falls back to the form", () => {
				wrapper.setProps({ serverMessage: "Example error message." });

				expect(wrapper.find("SendMailForm").state("isSubmitting")).toBeFalsy();
			});
		});
	});
});
