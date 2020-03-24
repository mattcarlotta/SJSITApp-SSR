import SideMenu from "../index";

const onHandleBreakpoint = jest.fn();
const onHandleTabClick = jest.fn();
const onHandleOpenMenuChange = jest.fn();

const initProps = {
	isCollapsed: false,
	hideSideBar: false,
	onHandleBreakpoint,
	onHandleTabClick,
	onHandleOpenMenuChange,
	selectedKey: ["/dashboard"],
	showDrawer: false,
	role: "staff",
};

const wrapper = shallow(<SideMenu {...initProps} />);

describe("Side Menu", () => {
	it("renders without errors", () => {
		expect(wrapper.find("Sider").exists()).toBeTruthy();
		expect(wrapper.find("NavMenu").exists()).toBeTruthy();
	});
});
