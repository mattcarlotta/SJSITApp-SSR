import SubmittingAPForm from "../index";

const wrapper = shallow(<SubmittingAPForm />);

describe("Help SubmittingAPForm", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
