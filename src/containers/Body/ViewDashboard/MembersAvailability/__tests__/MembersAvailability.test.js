import moment from "moment-timezone";
import { MembersAvailability } from "../index";

const format = "MM/DD/YYYY";
const fetchMembersAvailability = jest.fn();
const months = [
	`${moment()
		.startOf("month")
		.format()}`,
	`${moment()
		.endOf("month")
		.format()}`,
];
const membersAvailability = [
	{
		id: "Matt Carlotta",
		availability: 100,
	},
	{
		id: "Bob Dole",
		availability: 66,
	},
];

const initProps = {
	fetchMembersAvailability,
	isLoading: true,
	membersAvailability: [],
	months: [],
};

describe("MembersAvailability", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<MembersAvailability {...initProps} />);
	});

	afterEach(() => {
		fetchMembersAvailability.mockClear();
	});

	it("initally renders a LoadingPanel component", () => {
		expect(wrapper.find("LoadingPanel").exists()).toBeTruthy();
		expect(fetchMembersAvailability).toHaveBeenCalledTimes(1);
	});

	it("displays NoAvailability", () => {
		wrapper.setProps({ isLoading: false });
		expect(wrapper.find("NoAvailability").exists()).toBeTruthy();
		expect(wrapper.find(".ant-card-extra").exists()).toBeFalsy();
	});

	describe("Members have submitted availability", () => {
		beforeEach(() => {
			wrapper.setProps({ membersAvailability, months, isLoading: false });
		});

		it("displays the months in the header", () => {
			expect(wrapper.find(".ant-card-extra").text()).toEqual(
				`${moment(months[0]).format(format)} - ${moment(months[1]).format(
					format,
				)}`,
			);
		});

		it("renders a table of members and their availability", () => {
			const ListItem1 = wrapper.find("ListItem").first();
			const ListItem2 = wrapper.find("ListItem").at(1);

			expect(ListItem1.find("Bold").text()).toEqual("Matt Carlotta");
			expect(ListItem1.find("Float").text()).toEqual("100%");
			expect(ListItem1.get(0).props.style.backgroundColor).toEqual(
				"transparent",
			);

			expect(ListItem2.find("Bold").text()).toEqual("Bob Dole");
			expect(ListItem2.find("Float").text()).toEqual("66%");
			expect(ListItem2.get(0).props.style.backgroundColor).toEqual("#ebebeb");
		});
	});
});
