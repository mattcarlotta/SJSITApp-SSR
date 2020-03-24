import ViewingAllMail from "../index";

const wrapper = shallow(<ViewingAllMail />);

describe("Help ViewingAllMail", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
