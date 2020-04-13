import { AppLayout } from "../index";

const setSidebarState = jest.fn();

const initProps = {
	children: <p>Hello</p>,
	isCollapsed: false,
	firstName: "Beta",
	lastName: "Tester",
	router: {
		pathname: "/employee/dashboard",
	},
	role: "staff",
	setSidebarState,
};

const nextProps = {
	...initProps,
	router: {
		pathname: "/employee/forms/create",
	},
};

describe("AppLayout", () => {
	let wrapper;
	beforeEach(() => {
		wrapper = withRouterContext(AppLayout, initProps);
		jest.useFakeTimers();
	});

	afterEach(() => {
		setSidebarState.mockClear();
		jest.runAllTimers();
	});

	it("renders without errors", () => {
		expect(wrapper.find("#app").exists()).toBeTruthy();
	});

	it("handles sub menu opening during application load", () => {
		expect(wrapper.find("AppLayout").state("openKeys")).toEqual([]);

		wrapper.unmount();

		wrapper = withRouterContext(AppLayout, nextProps);

		expect(wrapper.find("AppLayout").state("openKeys")).toEqual(["forms"]);
	});

	it("renders the SideMenu", () => {
		expect(wrapper.find("SideMenu").exists()).toBeTruthy();
	});

	it("renders the Header with left and right menus", () => {
		expect(wrapper.find("LeftMenu").exists()).toBeTruthy();
		expect(wrapper.find("RightMenu").exists()).toBeTruthy();
	});

	it("renders the children routes", () => {
		expect(wrapper.find("main").text()).toEqual("Hello");
	});

	it("opens a submenu", () => {
		wrapper.find("AppLayout").instance().handleOpenMenuChange(["events"]);
		jest.advanceTimersByTime(3000);
		wrapper.update();

		expect(wrapper.find("AppLayout").state("openKeys")).toEqual(["events"]);

		wrapper
			.find("AppLayout")
			.instance()
			.handleOpenMenuChange(["events", "forms"]);
		jest.advanceTimersByTime(3000);
		wrapper.update();

		expect(wrapper.find("AppLayout").state("openKeys")).toEqual(["forms"]);
	});

	it("handles submenu clicks", () => {
		wrapper.find("AppLayout").instance().handleOpenMenuChange(["", "forms"]);
		jest.advanceTimersByTime(3000);
		wrapper.update();

		expect(wrapper.find("AppLayout").state("openKeys")).toEqual(["", "forms"]);
		expect(wrapper.find("li.ant-menu-submenu-open").text()).toContain("forms");

		wrapper.find("AppLayout").instance().handleOpenMenuChange([]);
		jest.advanceTimersByTime(3000);
		wrapper.update();

		expect(wrapper.find("li.ant-menu-submenu-open").exists()).toBeFalsy();
		expect(wrapper.find("AppLayout").state("openKeys")).toEqual([]);
	});

	it("handles tab clicks and closes any unneccessary sub menus", () => {
		wrapper.find("AppLayout").setState({ openKeys: ["forms"] });

		const value = "forms/viewall?page=1";
		wrapper
			.find("AppLayout")
			.instance()
			.handleTabClick({
				key: "forms/viewall",
				item: { props: { value } },
			});

		expect(wrapper.find("AppLayout").state("openKeys")).toEqual(["forms"]);

		wrapper
			.find("AppLayout")
			.instance()
			.handleTabClick({
				key: "schedule",
				item: { props: { value: "schedule" } },
			});
		expect(wrapper.find("AppLayout").state("openKeys")).toEqual([]);
	});

	it("doesn't store an opened key if the sidebar is collasped on mount", () => {
		wrapper = withRouterContext(AppLayout, { ...initProps, isCollapsed: true });
		expect(wrapper.find("AppLayout").state("openKeys")).toEqual([]);
	});

	it("collapses the SideMenu when the breakpoint is triggered", () => {
		wrapper.setProps({ router: { pathname: "/employee/forms/create" } });
		wrapper.find("AppLayout").instance().handleBreakpoint(false);

		expect(wrapper.find("AppLayout").state("hideSideBar")).toBeFalsy();
		expect(wrapper.find("AppLayout").state("openKeys")).toEqual(["forms"]);

		wrapper.find("AppLayout").instance().handleBreakpoint(true);

		expect(wrapper.find("AppLayout").state("hideSideBar")).toBeTruthy();
		expect(wrapper.find("AppLayout").state("openKeys")).toEqual([]);
	});

	it("toggles the Drawer menu open/closed", () => {
		wrapper.find("AppLayout").setState({ hideSideBar: true });
		wrapper.update();

		expect(wrapper.find("DrawerWrapper").props().open).toBeFalsy();
		wrapper.find("AppLayout").instance().toggleSideMenu();

		jest.advanceTimersByTime(3000);
		wrapper.update();

		expect(wrapper.find("AppLayout").state("showDrawer")).toBeTruthy();
		expect(wrapper.find("AppLayout").state("openKeys")).toEqual([]);

		expect(wrapper.find("DrawerWrapper").props().open).toBeTruthy();

		wrapper.find("AppLayout").setState({ hideSideBar: false });
		wrapper.find("AppLayout").instance().toggleSideMenu();
		jest.advanceTimersByTime(3000);
		wrapper.update();

		expect(setSidebarState).toHaveBeenCalledTimes(1);
	});

	it("stores the openTab when sidebar is collapsed and opened", () => {
		wrapper.find("AppLayout").instance().handleOpenMenuChange(["", "forms"]);
		wrapper.update();

		expect(wrapper.find("AppLayout").state("openKeys")).toEqual(["", "forms"]);

		wrapper.find("AppLayout").instance().toggleSideMenu();
		wrapper.update();

		expect(wrapper.find("AppLayout").state("openKeys")).toEqual([]);

		wrapper.find("AppLayout").instance().toggleSideMenu();
		wrapper.update();
		expect(wrapper.find("AppLayout").state("openKeys")).toEqual([]);
	});

	it("reloads open keys when Drawer Menu is opened/closed", () => {
		wrapper.setProps({ isCollapsed: true, router: { pathname: "forms" } });
		wrapper.find("AppLayout").setState({ hideSideBar: false });
		expect(wrapper.find("AppLayout").state("openKeys")).toEqual([]);

		wrapper.setProps({ isCollapsed: false });
		expect(wrapper.find("AppLayout").state("openKeys")).toEqual(["forms"]);
	});

	it("handles Drawer Menu open and closing", () => {
		wrapper.find("AppLayout").instance().toggleDrawerMenu();
		expect(wrapper.find("AppLayout").state("openKeys")).toEqual([]);
		expect(wrapper.find("AppLayout").state("showDrawer")).toBeTruthy();
	});
});
