import MemberEventCountChart from "../index";

const initProps = {
	members: [],
	height: "",
	style: {},
};

const members = [
	{ name: "Bob Dole", "Event Count": 1 },
	{ name: "Jane Doe", "Event Count": 2 },
];

describe("MemberEventCountChart", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<MemberEventCountChart {...initProps} />);
	});

	it("renders a placeholder no data", () => {
		expect(wrapper.find("p").at(1).text()).toEqual("No event data");
	});

	it("renders a ResponsiveBar when member data is present", () => {
		wrapper.setProps({ members });
		expect(wrapper.find("ResponsiveBar").exists()).toBeTruthy();
	});
});
