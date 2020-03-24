import { ViewDashboard } from "../index";

const initProps = {
	role: "employee",
};

const wrapper = shallow(<ViewDashboard {...initProps} />);

describe("View Dashboard", () => {
	it("renders Availability based upon 'employee' role", () => {
		expect(wrapper.find("Connect(Availability)").exists()).toBeTruthy();
	});

	it("renders MembersAvailability based upon 'staff' role", () => {
		wrapper.setProps({ role: "staff" });
		expect(wrapper.find("Connect(MembersAvailability)").exists()).toBeTruthy();
	});
});
