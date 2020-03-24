import ViewingSchedule from "../index";

const wrapper = shallow(<ViewingSchedule />);

describe("Help ViewingSchedule", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
