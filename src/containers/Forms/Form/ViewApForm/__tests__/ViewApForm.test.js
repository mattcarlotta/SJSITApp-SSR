import { ViewApForm } from "../index";

const id = "5d4e00bcf2d83c45a863e2bc";
const fetchFormAp = jest.fn();
const push = jest.fn();
const resetApForm = jest.fn();
const updateFormAp = jest.fn();

const viewForm = {
	_id: "0123456789",
	seasonId: "20192020",
	startMonth: "2019-08-01T07:00:00.000Z",
	endMonth: "2019-09-01T06:59:59.000Z",
	expirationDate: "2019-08-08T06:59:00.000Z",
	notes: "Test",
};

const events = [
	{
		_id: "5d5b5ee857a6d20abf49db19",
		eventDate: "2019-08-21T02:30:36.000Z",
		eventType: "Game",
		location: "SAP Center at San Jose",
		notes: "",
		opponent: "Vegas Golden Knights",
		team: "San Jose Sharks",
		employeeResponse: {
			_id: "0123456789",
			notes: "I'm gone all month.",
			response: "Prefer not to work.",
		},
	},
];

const initProps = {
	events: [],
	fetchFormAp,
	match: {
		params: {
			id,
		},
	},
	push,
	resetApForm,
	serverMessage: "",
	updateFormAp,
	viewForm: {},
};

describe("View Ap Form", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<ViewApForm {...initProps} />);
	});

	afterEach(() => {
		fetchFormAp.mockClear();
		resetApForm.mockClear();
		updateFormAp.mockClear();
	});

	it("renders without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});

	it("shows a LoadingForm and LoadingPanels when fetching events", () => {
		expect(wrapper.find("LoadingForm").exists()).toBeTruthy();
		expect(wrapper.find("LoadingPanel").exists()).toBeTruthy();
	});

	it("calls fetchFormAp on mount", () => {
		expect(fetchFormAp).toHaveBeenCalledWith(id);
	});

	it("calls resetApForm on unmount", () => {
		wrapper.unmount();
		expect(resetApForm).toHaveBeenCalledTimes(1);
	});

	describe("Form Initialized", () => {
		beforeEach(() => {
			jest.useFakeTimers();
			wrapper.setProps({ events, viewForm });
			wrapper.update();
		});

		it("initializes the fields and sets isLoading to false", () => {
			expect(wrapper.state("isLoading")).toBeFalsy();
		});

		it("updates a field value when changed", () => {
			const name = "5d5b5ee857a6d20abf49db19";
			const newValue = "I want to work.";
			wrapper.instance().handleChange({ target: { name, value: newValue } });

			jest.runAllTimers();

			wrapper.update();

			expect(
				wrapper.find("span.ant-radio-button-checked > input").props().value,
			).toEqual(newValue);
		});

		it("doesn't submit the form if a field has errors", () => {
			wrapper.find("form").simulate("submit");
			expect(updateFormAp).toHaveBeenCalledTimes(0);
		});

		describe("Form Submission", () => {
			let name;
			let value;
			beforeEach(() => {
				name = "5d5b5ee857a6d20abf49db19";
				value = "I want to work.";
				wrapper.instance().handleChange({ target: { name, value } });

				jest.runAllTimers();

				wrapper.update();
				wrapper.find("form").simulate("submit");
			});

			it("successful validation calls updateFormAp with fields", () => {
				expect(wrapper.state("isSubmitting")).toBeTruthy();
				expect(updateFormAp).toHaveBeenCalledWith({
					_id: viewForm._id,
					responses: [
						{
							id: events[0]._id,
							value,
							notes: "",
							updateEvent: false,
						},
					],
				});
			});

			it("on submission error, enables the form submit button", () => {
				wrapper.setProps({ serverMessage: "Example error message." });

				expect(wrapper.state("isSubmitting")).toBeFalsy();
				expect(wrapper.find("button[type='submit']").exists()).toBeTruthy();
			});
		});
	});
});
