import NoEvents from "../index";

const initProps = {
	selectedToday: true,
};

const wrapper = shallow(<NoEvents {...initProps} />);

describe("No Events", () => {
	it("renders a 'No events today' message", () => {
		expect(wrapper.find("FlexCenter").text()).toContain("No events today");
		expect(wrapper.find("MdEvent").exists()).toBeTruthy();
	});

	it("renders a 'No upcoming events' message", () => {
		wrapper.setProps({ selectedToday: false });
		expect(wrapper.find("FlexCenter").text()).toContain(
			"No upcoming scheduled events",
		);
		expect(wrapper.find("MdEventNote").exists()).toBeTruthy();
	});
});
