import EmailReminders from "../index";

const initProps = {
	status: false,
};

const wrapper = mount(<EmailReminders {...initProps} />);

describe("Email Reminders", () => {
	it("initially renders a 'FaTimes' if 'status' prop is false", () => {
		expect(wrapper.find("FaTimes").exists()).toBeTruthy();
	});

	it("initially renders a 'FaShareSquare' if 'status' prop is true", () => {
		wrapper.setProps({ status: true });
		expect(wrapper.find("FaShareSquare").exists()).toBeTruthy();
	});
});
