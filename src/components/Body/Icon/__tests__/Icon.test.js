import Icon from "../index";

const initProps = {
	type: "",
};

const wrapper = mount(<Icon {...initProps} />);

describe("Icon", () => {
	it("renders without errors", () => {
		expect(wrapper.find("Icon").exists()).toBeTruthy();
	});

	it("initially displays a bug if missing a type", () => {
		expect(wrapper.find("FaBug").exists()).toBeTruthy();
	});

	it("displays a Font Awesome icon by a string type", () => {
		wrapper.setProps({ type: "calander" });
		expect(wrapper.find("FaCalendarAlt").exists()).toBeTruthy();

		wrapper.setProps({ type: "erase" });
		expect(wrapper.find("FaTimesCircle").exists()).toBeTruthy();

		wrapper.setProps({ type: "id" });
		expect(wrapper.find("FaIdCard").exists()).toBeTruthy();

		wrapper.setProps({ type: "key" });
		expect(wrapper.find("FaKey").exists()).toBeTruthy();

		wrapper.setProps({ type: "location" });
		expect(wrapper.find("FaStreetView").exists()).toBeTruthy();

		wrapper.setProps({ type: "lock" });
		expect(wrapper.find("FaLock").exists()).toBeTruthy();

		wrapper.setProps({ type: "mail" });
		expect(wrapper.find("FaEnvelope").exists()).toBeTruthy();

		wrapper.setProps({ type: "note" });
		expect(wrapper.find("FaStickyNote").exists()).toBeTruthy();

		wrapper.setProps({ type: "person" });
		expect(wrapper.find("MdPersonPin").exists()).toBeTruthy();

		wrapper.setProps({ type: "puck" });
		expect(wrapper.find("FaHockeyPuck").exists()).toBeTruthy();

		wrapper.setProps({ type: "remove" });
		expect(wrapper.find("FaMinusCircle").exists()).toBeTruthy();

		wrapper.setProps({ type: "search" });
		expect(wrapper.find("FaSearch").exists()).toBeTruthy();

		wrapper.setProps({ type: "tshirt" });
		expect(wrapper.find("FaTshirt").exists()).toBeTruthy();

		wrapper.setProps({ type: "user" });
		expect(wrapper.find("FaUserCircle").exists()).toBeTruthy();

		wrapper.setProps({ type: "usertag" });
		expect(wrapper.find("FaIdBadge").exists()).toBeTruthy();
	});
});
