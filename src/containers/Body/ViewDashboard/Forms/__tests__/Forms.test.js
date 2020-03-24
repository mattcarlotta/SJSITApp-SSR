import moment from "moment-timezone";
import { Forms } from "../index";

const activeDate = moment()
	.add(6, "days")
	.format();

const apform = {
	_id: "5dbdc074387e5310fbd5fca1",
	endMonth: "2019-12-01T07:59:59.000Z",
	eventCounts: 11,
	expirationDate: `${moment()
		.subtract(30, "days")
		.format()}`,
	startMonth: "2019-11-01T07:00:00.000Z",
};

const fetchAPForm = jest.fn();
const push = jest.fn();

const initProps = {
	apform: {},
	isLoading: true,
	fetchAPForm,
	push,
};

describe("Dashboard Forms", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<Forms {...initProps} />);
	});

	afterEach(() => {
		fetchAPForm.mockClear();
		push.mockClear();
	});

	it("initially displays a LoadingPanel component", () => {
		expect(wrapper.find("LoadingPanel").exists()).toBeTruthy();
		expect(fetchAPForm).toHaveBeenCalledTimes(1);
	});

	it("displays a NoForms component if 'apform' is empty", () => {
		wrapper.setProps({ isLoading: false });
		expect(wrapper.find("NoForms").exists()).toBeTruthy();
	});

	describe("Form is active", () => {
		beforeEach(() => {
			wrapper.setProps({
				apform: { ...apform, expirationDate: activeDate },
				isLoading: false,
			});
		});

		it("enables the 'View' button", () => {
			wrapper.find("Button").simulate("click");
			expect(push).toHaveBeenCalledWith(`/employee/forms/view/${apform._id}`);
		});

		it("displays a message stating that the form has 6 days left", () => {
			const warningText = wrapper.find("WarningText").first();

			expect(warningText.text()).toContain(" This form will expire in");
			expect(warningText.get(0).props.style.backgroundColor).toEqual("#2979ff");
		});
	});

	describe("Form has expired", () => {
		beforeEach(() => {
			wrapper.setProps({ apform, isLoading: false });
		});

		it("hides the 'View' button", () => {
			expect(wrapper.find("Button").exists()).toBeFalsy();
		});

		it("displays a message stating that the form has expired", () => {
			const warningText = wrapper.find("WarningText").first();

			expect(warningText.text()).toEqual(
				" This form has expired and is no longer viewable.",
			);
			expect(warningText.get(0).props.style.backgroundColor).toEqual("#f56342");
		});
	});
});
