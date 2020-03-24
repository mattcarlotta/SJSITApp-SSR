import ViewingSchedules from "../index";

const wrapper = shallow(<ViewingSchedules />);

describe("Help ViewingSchedules", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
