import { EditMailForm } from "../index";

const id = "0123456789";
const fetchMail = jest.fn();
const updateMail = jest.fn();
const goBack = jest.fn();

const dataSource = [
	{
		_id: "5d83d5b32bff0853d6539cb6",
		email: "Bobby Axelrod <member10@example.com>",
	},
	{
		_id: "5d83d5b32bff0853d6539cb7",
		email: "Alisha Jones <member9@example.com>",
	},
];

const editMail = {
	dataSource,
	sendTo: ["Bobby Axelrod <member10@example.com>"],
	sendFrom: "San Jose Sharks Ice Team <noreply@sjsiceteam.com>",
	sendDate: "2019-10-15T00:00:00-07:00",
	subject: "Test",
	message: "<span>Test</span>",
};

const initProps = {
	fetchMail,
	editMail: {},
	match: {
		params: {
			id,
		},
	},
	goBack,
	serverMessage: "",
	updateMail,
};

const updatedValues = [
	{
		name: "sendTo",
		value: ["Alisha Jones <member9@example.com>"],
	},
	{
		name: "subject",
		value: "Edited Test",
	},
	{
		name: "message",
		value: "<span>Edited Test</span>",
	},
];

Object.defineProperty(global.document, "getSelection", { value: jest.fn() });

describe("Edit Mail Form", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = HOCWrap(EditMailForm, initProps);
	});

	afterEach(() => {
		fetchMail.mockClear();
		updateMail.mockClear();
	});

	it("renders without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});

	it("shows a LoadingForm when fetching names", () => {
		expect(wrapper.find("LoadingForm").exists()).toBeTruthy();
	});

	it("calls fetchMemberNames on mount", () => {
		expect(fetchMail).toHaveBeenCalledWith(id);
	});

	describe("Form Initialized", () => {
		beforeEach(() => {
			wrapper.setProps({ editMail });
			wrapper.update();
		});

		it("initializes the fields and sets isLoading to false", () => {
			expect(wrapper.find("EditMailForm").state("isLoading")).toBeFalsy();
		});

		it("updates a field value when changed", () => {
			const name = "subject";
			const newValue = "Test Updates";
			wrapper
				.find("EditMailForm")
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

			expect(wrapper.find("EditMailForm").state("showPreview")).toBeTruthy();
			expect(wrapper.find("EmailPreview").exists()).toBeTruthy();

			wrapper.find("button#close-modal").simulate("click");
			expect(wrapper.find("EditMailForm").state("showPreview")).toBeFalsy();
			expect(wrapper.find("EmailPreview").exists()).toBeFalsy();
		});

		it("doesn't submit the form if a field has errors", () => {
			wrapper
				.find("EditMailForm")
				.instance()
				.handleChange({ target: { name: "subject", value: "" } });
			wrapper.update();

			wrapper.find("form").simulate("submit");
			expect(updateMail).toHaveBeenCalledTimes(0);
		});

		describe("Form Submission", () => {
			beforeEach(() => {
				updatedValues.forEach(({ name, value }) => {
					wrapper
						.find("EditMailForm")
						.instance()
						.handleChange({ target: { name, value } });
				});
				wrapper.update();
				wrapper.find("form").simulate("submit");
			});

			it("successful validation calls updateEvent with fields", () => {
				expect(wrapper.find("EditMailForm").state("isSubmitting")).toBeTruthy();
				expect(updateMail).toHaveBeenCalledWith({
					_id: id,
					sendTo: ["Alisha Jones <member9@example.com>"],
					sendFrom: "San Jose Sharks Ice Team <noreply@sjsiceteam.com>",
					sendDate: "2019-10-15T00:00:00-07:00",
					subject: "Edited Test",
					message: "<p>Edited Test</p>",
				});
			});

			it("on submission error, falls back to the form", () => {
				wrapper.setProps({ serverMessage: "Example error message." });

				expect(wrapper.find("EditMailForm").state("isSubmitting")).toBeFalsy();
			});
		});
	});
});
