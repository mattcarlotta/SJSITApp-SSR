import LoadingScheduleForm from "../index";

describe("Loading Schedule Form", () => {
	it("renders without errors", () => {
		const wrapper = mount(<LoadingScheduleForm />);
		expect(wrapper.find("LoadingScheduleForm").exists()).toBeTruthy();
	});
});
