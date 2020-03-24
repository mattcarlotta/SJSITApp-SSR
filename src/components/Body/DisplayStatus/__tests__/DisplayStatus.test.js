import DisplayStatus from "../index";

const initProps = {
	status: "active",
};

describe("Display Status", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<DisplayStatus {...initProps} />);
	});

	it("if status is active, it displays a FaUser icon", () => {
		expect(wrapper.find("FaUser").exists()).toBeTruthy();
	});

	it("if status is suspended, it displays a FaUserTimes icon", () => {
		wrapper.setProps({ status: "suspended" });

		expect(wrapper.find("FaUserTimes").exists()).toBeTruthy();
	});
});
