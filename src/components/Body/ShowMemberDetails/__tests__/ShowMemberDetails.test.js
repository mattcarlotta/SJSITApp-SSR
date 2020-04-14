import ShowMemberDetails from "../index";

const deleteAvatar = jest.fn();
const updateAvatar = jest.fn();

const initProps = {
	firstName: "Bob",
	lastName: "Dole",
	registered: "2020-04-21T21:00:00.000+00:00",
	role: "employee",
	status: "active",
};

describe("ShowMemberDetails", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<ShowMemberDetails {...initProps} />);
	});

	it("renders a first and last name", () => {
		expect(wrapper.find("Title").text()).toEqual("Bob Dole");
	});

	it("renders an account status", () => {
		expect(wrapper.find("LightText").first().text()).toContain("active");
	});

	it("renders an registered date", () => {
		expect(wrapper.find("LightText").at(1).text()).toContain(
			"April 21st, 2020",
		);
	});

	it("renders an registered date", () => {
		expect(wrapper.find("LightText").at(2).text()).toContain("employee");
	});
});
