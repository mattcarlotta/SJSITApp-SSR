import DisplayAvatar from "../index";

const initProps = {
	avatar: "",
	style: {},
	width: "",
};

describe("Display Avatar", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<DisplayAvatar {...initProps} />);
	});

	it("renders without errors", () => {
		expect(wrapper.find("div#display-avatar").exists()).toBeTruthy();
	});

	it("initially renders a placeholder icon", () => {
		expect(wrapper.find("FaUserCircle").exists()).toBeTruthy();
	});

	it("renders an img when an avatar is present", () => {
		wrapper.setProps({ avatar: "1234.png" });
		expect(wrapper.find("img").exists()).toBeTruthy();
	});
});
