import TokenStatus from "../index";

const initProps = {
	email: "member@example.com",
};

describe("Token Status", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = shallow(<TokenStatus {...initProps} />);
	});

	it("if email is present, it displays a FaUserCheck icon", () => {
		expect(wrapper.find("FaUserCheck").exists()).toBeTruthy();
	});

	it("if email is missing, it displays a FaUserClock icon", () => {
		wrapper.setProps({ email: "" });

		expect(wrapper.find("FaUserClock").exists()).toBeTruthy();
	});
});
