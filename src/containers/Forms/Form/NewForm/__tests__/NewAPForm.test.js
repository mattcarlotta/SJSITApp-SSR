import moment from "moment-timezone";
import { NewAPForm } from "../index";

const createForm = jest.fn();
const fetchSeasonsIds = jest.fn();
const push = jest.fn();

const initProps = {
	createForm,
	fetchSeasonsIds,
	push,
	seasonIds: [],
	serverMessage: "",
};

const seasonIds = ["20002001", "20012002", "20022003"];

describe("New AP Form", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<NewAPForm {...initProps} />);
	});

	afterEach(() => {
		createForm.mockClear();
		fetchSeasonsIds.mockClear();
	});

	it("renders without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});

	it("shows a LoadingForm when fetching seasonIds and the token to edit", () => {
		expect(wrapper.find("LoadingForm").exists()).toBeTruthy();
	});

	it("calls fetchSeasonsIds on mount", () => {
		expect(fetchSeasonsIds).toHaveBeenCalledTimes(1);
	});

	describe("Form Initialized", () => {
		beforeEach(() => {
			wrapper.setProps({ seasonIds });
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

		it("updates a field value when changed", () => {
			const name = "notes";
			const newValue = "Special event.";
			wrapper.instance().handleChange({ target: { name, value: newValue } });
			wrapper.update();

			expect(wrapper.find("textarea").props().value).toEqual(newValue);
		});

		it("doesn't submit the form if a field has errors", () => {
			wrapper.find("form").simulate("submit");
			expect(createForm).toHaveBeenCalledTimes(0);
		});

		describe("Form Submission", () => {
			beforeEach(() => {
				wrapper
					.instance()
					.handleChange({ target: { name: "seasonId", value: "20002001" } });

				wrapper.instance().handleChange({
					target: {
						name: "expirationDate",
						value: moment("2019-08-08T06:59:00.000+00:00"),
					},
				});

				wrapper.update();

				wrapper.find("form").simulate("submit");
			});

			it("successful validation calls updateMember with fields", () => {
				expect(wrapper.state("isSubmitting")).toBeTruthy();
				expect(createForm).toHaveBeenCalledWith({
					seasonId: "20002001",
					enrollMonth: [
						moment()
							.startOf("month")
							.format(),
						moment()
							.endOf("month")
							.format(),
					],
					expirationDate: "2019-08-07T23:59:00-07:00",
					notes: "",
					sendEmailNotificationsDate: "",
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
