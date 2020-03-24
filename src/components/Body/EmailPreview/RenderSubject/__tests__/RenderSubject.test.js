import RenderSubject from "../index";

const initProps = {
	subject: "",
};

const subject = "Test";

const wrapper = mount(<RenderSubject {...initProps} />);

describe("Render Email Subject", () => {
	it("initially displays an empty message", () => {
		expect(wrapper.find("span#emptysubject").exists()).toBeTruthy();
	});

	it("displays a subject", () => {
		wrapper.setProps({ subject });
		expect(wrapper.find("h2").text()).toEqual(subject);
	});
});
