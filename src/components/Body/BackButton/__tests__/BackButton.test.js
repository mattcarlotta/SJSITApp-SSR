import BackButton from "../index";

const push = jest.fn();
const location = "schedule";

const initProps = {
	location,
	push,
	style: {},
};

const wrapper = shallow(<BackButton {...initProps} />);

describe("Back Button", () => {
	it("renders without errors", () => {
		expect(wrapper.find("Button").exists()).toBeTruthy();
	});

	it("calls push when clicked", () => {
		wrapper.find("Button").simulate("click");

		expect(push).toHaveBeenCalledWith(location);
	});
});
