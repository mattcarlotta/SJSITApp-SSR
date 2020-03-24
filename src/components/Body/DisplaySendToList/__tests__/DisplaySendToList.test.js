import DisplaySendToList, { showFullList } from "../index";

const emails = ["test@test.com", "test2@test.com"];

const initProps = {
	emails: ["test@test.com"],
};

const wrapper = mount(<DisplaySendToList {...initProps} />);

describe("Display Email SendTo List", () => {
	it("initally displays a single email address", () => {
		expect(wrapper.find("span").text()).toEqual(emails[0]);
	});

	it("initally displays a multiple email address", () => {
		wrapper.setProps({ emails });
		expect(wrapper.find("span").text()).toEqual("multiple email addresses");
	});

	it("the tooltip displays a list of emails", () => {
		const nodes = showFullList(emails);

		expect(nodes).toHaveLength(2);
	});
});
