import ViewingContact from "../index";

const wrapper = shallow(<ViewingContact />);

describe("Help ViewingContact", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
