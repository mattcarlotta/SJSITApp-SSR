import ViewingResponses from "../index";

const wrapper = shallow(<ViewingResponses />);

describe("Help ViewingResponses", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
