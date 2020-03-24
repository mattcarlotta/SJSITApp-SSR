import DisplayEmailReminder from "../index";

const initProps = {
	reminder: false,
};

const wrapper = mount(<DisplayEmailReminder {...initProps} />);

describe("Display Email Reminder", () => {
	it("initally displays an unsent email reminders icon when 'reminder' prop is false", () => {
		expect(wrapper.find("FaStopwatch").exists()).toBeTruthy();
	});

	it("displays an sent email reminder icon when 'reminder' prop is true", () => {
		wrapper.setProps({ reminder: true });
		expect(wrapper.find("FaShareSquare").exists()).toBeTruthy();
	});
});
