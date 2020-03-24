import RenderSendFrom from "../index";

const initProps = {
	sendDate: "",
	sendFrom: "",
};

const wrapper = shallow(<RenderSendFrom {...initProps} />);

describe("Render Email SendFrom", () => {
	it("initally renders invalidsendingaddress", () => {
		expect(wrapper.find("#invalidsendingaddress").exists()).toBeTruthy();
	});

	it("renders the sendFrom address", () => {
		const email = "test@test.com";
		wrapper.setProps({
			sendDate: "2019-10-09T00:27:30.000+00:00",
			sendFrom: email,
		});

		expect(wrapper.find("Bold").text()).toEqual(email);
	});

	it("renders the sendFrom address with brackets", () => {
		const email = "Test Test <test@test.com>";
		wrapper.setProps({
			sendDate: "2019-10-09T00:27:30.000+00:00",
			sendFrom: email,
		});

		expect(wrapper.find("#sendfromaddress").text()).toContain(
			"<test@test.com>",
		);
	});
});
