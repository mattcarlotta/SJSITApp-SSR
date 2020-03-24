import ViewingMySchedule from "../index";

const wrapper = shallow(<ViewingMySchedule />);

describe("Help ViewingMySchedule", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
