import UpdatingAPForm from "../index";

const wrapper = shallow(<UpdatingAPForm />);

describe("Help UpdatingAPForm", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
