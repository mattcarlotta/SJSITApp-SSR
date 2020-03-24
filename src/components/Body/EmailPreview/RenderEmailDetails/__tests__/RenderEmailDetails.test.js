import RenderEmailDetails from "../index";

const initProps = {
	sendTo: [],
	sendFrom: "",
	sendDate: "",
	subject: "",
};

const nextProps = {
	sendTo: ["Test Test <test@test.com>"],
	sendFrom: "Test2 Test <test2@test.com>",
	sendDate: "2019-10-09T00:27:30.000+00:00",
	subject: "Test",
};

const multiSendTo = [
	"Test Test <test@test.com>",
	"Test2 Test2 <test2@test2.com>",
];

const wrapper = mount(<RenderEmailDetails {...initProps} />);

describe("Render Emails Details", () => {
	it("renders without errors", () => {
		expect(wrapper.find("div.renderdetails").exists()).toBeTruthy();
	});

	it("initially displays placeholders", () => {
		expect(wrapper.find("span.invalidsendfromaddresse").exists()).toBeTruthy();
		expect(wrapper.find("span.invalidrecipient").exists()).toBeTruthy();
		expect(wrapper.find("span.emptysubject").exists()).toBeTruthy();
	});

	it("displays email details", () => {
		wrapper.setProps({ ...nextProps });

		expect(
			wrapper
				.find("Text")
				.at(1)
				.text(),
		).toEqual(nextProps.sendFrom);
		expect(
			wrapper
				.find("Text")
				.at(3)
				.text(),
		).toEqual(nextProps.sendTo[0]);
		expect(
			wrapper
				.find("Text")
				.at(7)
				.text(),
		).toEqual(nextProps.subject);
	});

	it("displays multiplerecipients email addresses", () => {
		wrapper.setProps({ sendTo: multiSendTo });

		expect(
			wrapper
				.find("p#multiplerecipients")
				.first()
				.text(),
		).toEqual(`${multiSendTo[0]}, `);
		expect(
			wrapper
				.find("p#multiplerecipients")
				.at(1)
				.text(),
		).toEqual(`${multiSendTo[1]}`);
	});
});
