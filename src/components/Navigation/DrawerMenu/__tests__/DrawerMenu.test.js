import DrawerMenu from "../index";

const onHandleBreakpoint = jest.fn();
const onHandleTabClick = jest.fn();
const onHandleOpenMenuChange = jest.fn();
const onHandleToggleDrawer = jest.fn();

const initProps = {
	isCollapsed: false,
	hideSideBar: false,
	onHandleBreakpoint,
	onHandleTabClick,
	onHandleOpenMenuChange,
	onHandleToggleDrawer,
	selectedKey: ["/dashboard"],
	showDrawer: false,
	role: "staff",
};

const wrapper = shallow(<DrawerMenu {...initProps} />);

describe("Side Menu", () => {
	it("renders without errors", () => {
		expect(wrapper.find("withConfigConsumer(Drawer)").exists()).toBeTruthy();
		expect(wrapper.find("NavMenu").exists()).toBeTruthy();
	});
});
