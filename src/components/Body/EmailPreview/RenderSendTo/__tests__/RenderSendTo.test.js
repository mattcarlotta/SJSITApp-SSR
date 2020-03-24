import RenderSendTo from "../index";

const initProps = {
	fields: {
		message: "",
		sendTo: [],
		sendFrom: "",
		sendDate: "",
		subject: "",
	},
};

const wrapper = shallow(<RenderSendTo {...initProps} />);

describe("Render Email SendTo", () => {
	it("initially renders an invalid send to address message", () => {
		expect(wrapper.find("#invalidsendtoaddress").exists()).toBeTruthy();
	});

	it("renders a single address", () => {
		wrapper.setProps({
			fields: {
				message: "",
				sendTo: ["test@test.com"],
				sendFrom: "",
				sendDate: "",
				subject: "",
			},
		});

		expect(wrapper.find("#singleemailaddress").exists()).toBeTruthy();
	});

	it("renders mutilple addresses", () => {
		const sendTo = ["Test Test <test@test.com>", "Test2 Test <test2@test.com>"];
		wrapper.setProps({
			fields: {
				message: "",
				sendTo,
				sendFrom: "",
				sendDate: "",
				subject: "",
			},
		});

		expect(
			wrapper
				.find("#multipleemailaddresses")
				.first()
				.text(),
		).toEqual(`Test Test, `);
		expect(
			wrapper
				.find("#multipleemailaddresses")
				.at(1)
				.text(),
		).toEqual(`Test2 Test.`);
	});
});
