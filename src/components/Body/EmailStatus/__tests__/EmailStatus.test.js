import EmailStatus from "../index";

const initProps = {
	status: "",
};

const wrapper = mount(<EmailStatus {...initProps} />);

describe("Email Status", () => {
	it("initially renders a 'FaTimes' if 'status' prop is empty or failed", () => {
		expect(wrapper.find("FaTimes").exists()).toBeTruthy();
	});
	it("initially renders a 'FaStopwatch' if 'status' prop is 'unsent'", () => {
		wrapper.setProps({ status: "unsent" });
		expect(wrapper.find("FaStopwatch").exists()).toBeTruthy();
	});
	it("initially renders a 'FaShareSquare' if 'status' prop is 'sent'", () => {
		wrapper.setProps({ status: "sent" });
		expect(wrapper.find("FaShareSquare").exists()).toBeTruthy();
	});
});
