import moment from "moment-timezone";
import { NewEventForm } from "../index";

const createEvent = jest.fn();
const initializeNewEvent = jest.fn();
const push = jest.fn();
const seasonIds = ["20002001", "20012002", "20022003"];

const teams = ["1", "2", "3", "4"];

const newDate = moment("2019-08-11T02:30:30.036+00:00");

const initProps = {
	createEvent,
	initializeNewEvent,
	newEvent: {},
	push,
	serverMessage: "",
};

describe("New Event Form", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<NewEventForm {...initProps} />);
	});

	afterEach(() => {
		createEvent.mockClear();
		initializeNewEvent.mockClear();
	});

	it("renders without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});

	it("shows a LoadingForm when fetching seasonIds", () => {
		expect(wrapper.find("LoadingForm").exists()).toBeTruthy();
	});

	it("calls fetchSeasonsIds on mount", () => {
		expect(initializeNewEvent).toHaveBeenCalledTimes(1);
	});

	describe("Form Initializied", () => {
		beforeEach(() => {
			wrapper.setProps({ newEvent: { seasonIds, teams } });
		});

		it("initializes the SeasonID field with seasonIds options", () => {
			expect(
				wrapper
					.find("Select")
					.first()
					.props().selectOptions,
			).toEqual(seasonIds);

			expect(wrapper.state("isLoading")).toBeFalsy();
		});

		it("initializes the opponent field with team options", () => {
			expect(
				wrapper
					.find("Select")
					.at(3)
					.props().selectOptions,
			).toEqual(teams);

			expect(wrapper.state("isLoading")).toBeFalsy();
		});

		it("adds/removes another call time slot", () => {
			expect(wrapper.find(".ant-row.ant-form-item")).toHaveLength(3);

			wrapper
				.find("button[type='button']")
				.at(1)
				.simulate("click");

			expect(wrapper.find(".ant-row.ant-form-item")).toHaveLength(4);

			wrapper.find("i.remove-time-slot").simulate("click");

			expect(wrapper.find(".ant-row.ant-form-item")).toHaveLength(3);
		});

		it("updates a field value when changed", () => {
			const name = "location";
			const newValue = "New Location @ Example";
			wrapper.instance().handleChange({ target: { name, value: newValue } });
			wrapper.update();

			expect(
				wrapper
					.find("input")
					.at(1)
					.props().value,
			).toEqual(newValue);
		});

		it("doesn't submit the form if a field has errors", () => {
			const name = "location";
			const newValue = "";
			wrapper.instance().handleChange({ target: { name, value: newValue } });
			wrapper.update();

			wrapper.find("form").simulate("submit");
			expect(createEvent).toHaveBeenCalledTimes(0);
		});

		describe("Form Submission", () => {
			beforeEach(() => {
				wrapper
					.instance()
					.handleChange({ target: { name: "seasonId", value: "20002001" } });

				wrapper
					.instance()
					.handleChange({ target: { name: "eventDate", value: newDate } });

				wrapper.instance().handleChange({
					target: { name: "opponent", value: "Anaheim Ducks" },
				});

				wrapper.instance().handleChange({
					target: { name: "callTime", value: newDate },
				});

				wrapper.update();

				wrapper.find("form").simulate("submit");
			});

			it("successful validation calls createEvent with fields", () => {
				expect(wrapper.state("isSubmitting")).toBeTruthy();
				expect(createEvent).toHaveBeenCalledWith({
					seasonId: "20002001",
					team: "San Jose Sharks",
					opponent: "Anaheim Ducks",
					eventType: "Game",
					location: "SAP Center at San Jose",
					eventDate: "2019-08-10T19:30:30-07:00",
					uniform: "Sharks Teal Jersey",
					notes: "",
					callTimes: ["2019-08-10T19:30:30-07:00"],
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
