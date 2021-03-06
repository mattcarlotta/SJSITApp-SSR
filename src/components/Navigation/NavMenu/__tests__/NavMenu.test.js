import NavMenu from "../index";

const onHandleTabClick = jest.fn();
const onHandleOpenMenuChange = jest.fn();

const initProps = {
	isCollapsed: false,
	onHandleTabClick,
	onHandleOpenMenuChange,
	openKeys: ["/dashboard"],
	selectedKey: ["/dashboard"],
	role: "staff",
};

describe("NavMenu", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = mount(<NavMenu {...initProps} />);
	});

	afterEach(() => {
		onHandleTabClick.mockClear();
		onHandleOpenMenuChange.mockClear();
	});

	it("renders without errors", () => {
		expect(wrapper.find("Title").text()).toEqual("Sharks Ice Team");
		expect(wrapper.find("Legal").exists()).toBeTruthy();
	});

	it("renders staff routes", () => {
		expect(wrapper.find("li").at(0).text()).toEqual("dashboard");
		expect(wrapper.find("li").at(1).text()).toEqual("events");
		expect(wrapper.find("li").at(2).text()).toEqual("forms");
		expect(wrapper.find("li").at(3).text()).toEqual("mail");
		expect(wrapper.find("li").at(4).text()).toEqual("members");
		expect(wrapper.find("li").at(5).text()).toEqual("schedule");
		expect(wrapper.find("li").at(6).text()).toEqual("seasons");
	});

	it("renders employee routes", () => {
		wrapper.setProps({ role: "employee" });

		expect(wrapper.find("li").first().text()).toEqual("dashboard");
		expect(wrapper.find("li").at(1).text()).toEqual("schedule");
	});

	it("collapsing the menu, displays an 'IT' title and hides the legal info", () => {
		wrapper.setProps({ isCollapsed: true });

		expect(wrapper.find("Title").text()).toEqual("IT");
		expect(wrapper.find("Legal").exists()).toBeFalsy();
	});

	it("calls onHandleTabClick when a MenuItem is clicked", () => {
		jest.useFakeTimers();

		wrapper.find(".ant-menu-item").first().simulate("click");

		jest.runAllTimers();
		wrapper.update();

		expect(onHandleTabClick).toHaveBeenCalledTimes(1);
	});

	it("calls onHandleOpenMenuChange when a submenu has been clicked", () => {
		jest.useFakeTimers();

		wrapper.find(".ant-menu-submenu-title").first().simulate("click");

		jest.runAllTimers();
		wrapper.update();

		expect(onHandleOpenMenuChange).toHaveBeenCalledTimes(1);
	});
});
