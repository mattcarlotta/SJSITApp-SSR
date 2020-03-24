import ViewingMonthlyMemberSchedule from "../index";

const wrapper = shallow(<ViewingMonthlyMemberSchedule />);

describe("Help ViewingMonthlyMemberSchedule", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
