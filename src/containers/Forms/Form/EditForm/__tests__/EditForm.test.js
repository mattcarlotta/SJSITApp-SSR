import { EditForm } from "../index";

const id = "5d54769658ae8d57e19a1ecc";
const fetchForm = jest.fn();
const goBack = jest.fn();
const updateForm = jest.fn();

const editForm = {
	_id: "5d54769658ae8d57e19a1ecc",
	seasonId: "20192020",
	seasonIds: ["20192020", "20202021", "20212022"],
	startMonth: "2019-08-01T07:00:00.000Z",
	endMonth: "2019-09-01T06:59:59.000Z",
	expirationDate: "2019-08-08T06:59:00.000Z",
	notes: "Hello",
	__v: 0,
};

const initProps = {
	editForm: {},
	fetchForm,
	match: {
		params: {
			id,
		},
	},
	goBack,
	serverMessage: "",
	updateForm,
};

describe("Edit Form", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<EditForm {...initProps} />);
	});

	afterEach(() => {
		fetchForm.mockClear();
		updateForm.mockClear();
	});

	it("renders without errors", () => {
		expect(wrapper.find("Card").exists()).toBeTruthy();
	});

	it("shows a LoadingForm when fetching seasonIds", () => {
		expect(wrapper.find("LoadingForm").exists()).toBeTruthy();
	});

	it("calls fetchEvent on mount", () => {
		expect(fetchForm).toHaveBeenCalledWith(id);
	});

	describe("Form Initializied", () => {
		beforeEach(() => {
			wrapper.setProps({ editForm });
			wrapper.update();
		});

		it("initializes the fields and sets isLoading to false", () => {
			expect(wrapper.state("isLoading")).toBeFalsy();
		});

		it("updates a field value when changed", () => {
			const name = "notes";
			const newValue = "New Location @ Example";
			wrapper.instance().handleChange({ target: { name, value: newValue } });
			wrapper.update();

			expect(wrapper.find("textarea").props().value).toEqual(newValue);
		});

		it("doesn't submit the form if a field has errors", () => {
			wrapper
				.find(".ant-calendar-picker-clear")
				.first()
				.simulate("click");

			wrapper.find("form").simulate("submit");
			expect(updateForm).toHaveBeenCalledTimes(0);
		});

		describe("Form Submission", () => {
			beforeEach(() => {
				wrapper.find("form").simulate("submit");
			});

			it("successful validation calls updateEvent with fields", () => {
				expect(wrapper.state("isSubmitting")).toBeTruthy();
				expect(updateForm).toHaveBeenCalledWith({
					_id: id,
					seasonId: "20192020",
					enrollMonth: [
						"2019-08-01T00:00:00-07:00",
						"2019-08-31T23:59:59-07:00",
					],
					expirationDate: "2019-08-07T23:59:00-07:00",
					notes: "Hello",
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
