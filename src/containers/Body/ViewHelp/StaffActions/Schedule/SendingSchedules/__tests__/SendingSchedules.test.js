import SendingSchedules from "../index";

const wrapper = shallow(<SendingSchedules />);

describe("Help SendingSchedules", () => {
	it("renders without errors", () => {
		expect(wrapper.find("TextContainer").exists()).toBeTruthy();
	});
});
