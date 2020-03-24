import Notes from "../index";

const notes = "This is a special note.";

const initProps = {
	notes,
	style: {},
};

const wrapper = mount(<Notes {...initProps} />);

describe("Notes", () => {
	it("renders without errors", () => {
		expect(wrapper.find("div").exists()).toBeTruthy();
		expect(wrapper.find("div").text()).toContain(notes);
	});
});
