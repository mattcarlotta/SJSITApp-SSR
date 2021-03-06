import preloadAll from "jest-next-dynamic";
import { SendMailForm } from "../index";

const createMail = jest.fn();

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
	memberNames: [],
	router: {
		query: { id: "0123456789" },
	},
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
		wrapper = mount(<SendMailForm {...initProps} />);
	});

	beforeAll(async () => {
		await preloadAll();
	});

	afterEach(() => {
		createMail.mockClear();
	});

	it("renders without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});

	it("shows a LoadingForm when fetching names", () => {
		expect(wrapper.find("LoadingForm").exists()).toBeTruthy();
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

			expect(wrapper.find("input").at(6).props().value).toEqual(newValue);
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
				expect(createMail).toHaveBeenCalledTimes(1);
			});

			it("on submission error, falls back to the form", () => {
				wrapper.setProps({ serverMessage: "Example error message." });

				expect(wrapper.find("SendMailForm").state("isSubmitting")).toBeFalsy();
			});
		});
	});
});
