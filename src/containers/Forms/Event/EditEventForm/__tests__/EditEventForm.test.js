import { EditEventForm } from "../index";

const id = "5d4e00bcf2d83c45a863e2bc";
const fetchEvent = jest.fn();
const push = jest.fn();
const updateEvent = jest.fn();

const editEvent = {
	_id: "5d4e00bcf2d83c45a863e2bc",
	seasonIds: ["20002001", "20012002", "20022003"],
	team: "San Jose Sharks",
	opponent: "Anaheim Ducks",
	eventType: "Game",
	location: "SAP Center at San Jose",
	callTimes: [
		"2019-08-09T17:45:26-07:00",
		"2019-08-11T18:15:33-07:00",
		"2019-08-11T18:30:33-07:00",
		"2019-08-11T19:00:33-07:00",
	],
	uniform: "Sharks Teal Jersey",
	seasonId: "20192020",
	eventDate: "2019-08-10T02:30:31.834Z",
	notes: "",
};

const initProps = {
	editEvent: {},
	fetchEvent,
	match: {
		params: {
			id,
		},
	},
	push,
	serverMessage: "",
	updateEvent,
};

describe("New Event Form", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<EditEventForm {...initProps} />);
	});

	afterEach(() => {
		fetchEvent.mockClear();
		updateEvent.mockClear();
	});

	it("renders without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});

	it("shows a LoadingForm when fetching seasonIds", () => {
		expect(wrapper.find("LoadingForm").exists()).toBeTruthy();
	});

	it("calls fetchEvent on mount", () => {
		expect(fetchEvent).toHaveBeenCalledWith(id);
	});

	describe("Form Initialized", () => {
		beforeEach(() => {
			wrapper.setProps({ editEvent });
			wrapper.update();
		});

		it("initializes the fields and sets isLoading to false", () => {
			expect(wrapper.state("isLoading")).toBeFalsy();
		});

		it("adds/removes another call time slot", () => {
			expect(wrapper.find(".ant-row.ant-form-item")).toHaveLength(6);

			wrapper
				.find("button[type='button']")
				.at(1)
				.simulate("click");

			expect(wrapper.find(".ant-row.ant-form-item")).toHaveLength(7);

			wrapper
				.find("i.remove-time-slot")
				.first()
				.simulate("click");

			expect(wrapper.find(".ant-row.ant-form-item")).toHaveLength(6);
		});

		it("updates a field value when changed", () => {
			const name = "location";
			const newValue = "New Location @ Example";
			wrapper.instance().handleChange({ target: { name, value: newValue } });
			wrapper.update();

			expect(
				wrapper
					.find("input")
					.first()
					.props().value,
			).toEqual(newValue);
		});

		it("doesn't submit the form if a field has errors", () => {
			const name = "location";
			const newValue = "";
			wrapper.instance().handleChange({ target: { name, value: newValue } });
			wrapper.update();

			wrapper.find("form").simulate("submit");
			expect(updateEvent).toHaveBeenCalledTimes(0);
		});

		describe("Form Submission", () => {
			beforeEach(() => {
				wrapper.find("form").simulate("submit");
			});

			it("successful validation calls updateEvent with fields", () => {
				expect(wrapper.state("isSubmitting")).toBeTruthy();
				expect(updateEvent).toHaveBeenCalledWith({
					_id: id,
					seasonId: "20192020",
					team: "San Jose Sharks",
					opponent: "Anaheim Ducks",
					eventType: "Game",
					location: "SAP Center at San Jose",
					eventDate: "2019-08-09T19:30:31-07:00",
					uniform: "Sharks Teal Jersey",
					notes: "",
					callTimes: [
						"2019-08-09T17:45:26-07:00",
						"2019-08-11T18:15:33-07:00",
						"2019-08-11T18:30:33-07:00",
						"2019-08-11T19:00:33-07:00",
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
