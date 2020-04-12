import { AppLayout } from "../index";

const initProps = {
	router: {
		pathname: "/employee/dashboard",
	},
	firstName: "Beta",
	lastName: "Tester",
	role: "staff",
	isCollapsed: false,
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
		wrapper = mount(<AppLayout {...initProps} />);
		jest.useFakeTimers();
	});

	afterEach(() => {
		jest.runAllTimers();
	});

	it("renders without errors", () => {
		expect(wrapper.find("#app").exists()).toBeTruthy();
	});

	it("handles sub menu opening during application load", () => {
		expect(wrapper.find("AppLayout").state("openKeys")).toEqual([]);
		wrapper.unmount();

		wrapper = mount(<AppLayout {...nextProps} />);
		expect(wrapper.find("AppLayout").state("openKeys")).toEqual(["forms"]);
	});

	it("renders the SideMenu", () => {
		expect(wrapper.find("SideMenu").exists()).toBeTruthy();
	});

	it("renders the Header with left and right menus", () => {
		expect(wrapper.find("LeftMenu").exists()).toBeTruthy();
		expect(wrapper.find("RightMenu").exists()).toBeTruthy();
	});

	it("renders the employee app routes", () => {
		expect(wrapper.find("AppRoutes").exists()).toBeTruthy();
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
		expect(push).toHaveBeenCalledWith(`/employee/${value}`);

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

	it("collapses the SideMenu when the breakpoint is triggered", () => {
		wrapper.setProps({ location: { pathname: "/employee/forms/create" } });

		wrapper.find("AppLayout").instance().handleBreakpoint(false);

		expect(wrapper.find("AppLayout").state("isCollapsed")).toBeFalsy();
		expect(wrapper.find("AppLayout").state("hideSideBar")).toBeFalsy();
		expect(wrapper.find("AAppLayoutpp").state("openKeys")).toEqual(["forms"]);

		wrapper.find("AppLayout").instance().handleBreakpoint(true);

		expect(wrapper.find("AppLayout").state("isCollapsed")).toBeTruthy();
		expect(wrapper.find("AppLayout").state("hideSideBar")).toBeTruthy();
		expect(wrapper.find("AppLayout").state("openKeys")).toEqual([]);
	});

	it("toggles sidebar menu", () => {
		expect(
			wrapper.find("aside.ant-layout-sider-collapsed").exists(),
		).toBeFalsy();

		wrapper.find("AppLayout").instance().toggleSideMenu();

		jest.advanceTimersByTime(3000);

		wrapper.update();
		expect(wrapper.find("AppLayout").state("isCollapsed")).toBeTruthy();
		expect(wrapper.find("AppLayout").state("openKeys")).toEqual([]);
		expect(
			wrapper.find("aside.ant-layout-sider-collapsed").exists(),
		).toBeTruthy();
	});

	it("stores the openTab when sidebar is collapsed and opened", () => {
		wrapper.find("AppLayout").instance().handleOpenMenuChange(["", "forms"]);

		jest.advanceTimersByTime(3000);

		wrapper.update();
		expect(wrapper.find("AppLayout").state("openKeys")).toEqual(["", "forms"]);

		wrapper.find("AppLayout").instance().toggleSideMenu();

		jest.advanceTimersByTime(3000);

		wrapper.update();
		expect(wrapper.find("AppLayout").state("openKeys")).toEqual([]);

		wrapper.find("AppLayout").instance().toggleSideMenu();

		jest.advanceTimersByTime(3000);

		wrapper.update();
		expect(wrapper.find("AppLayout").state("openKeys")).toEqual([]);
	});

	it("updates the active tab", () => {
		expect(wrapper.find("li.ant-menu-item-selected").text()).toEqual(
			"dashboard",
		);

		wrapper.setProps({
			location: {
				pathname: "/employee/forms/viewall",
			},
		});

		jest.advanceTimersByTime(3000);

		wrapper.update();

		expect(wrapper.find("AppLayout").state("openKeys")).toEqual(["forms"]);
		expect(wrapper.find("AppLayout").state("selectedKey")).toContain(
			"forms/viewall",
		);
		expect(wrapper.find("li.ant-menu-item-selected").text()).toEqual(
			"View Forms",
		);

		wrapper.find("AppLayout").instance().toggleSideMenu();

		wrapper.setProps({
			location: {
				pathname: "/employee/events/viewall",
			},
		});

		jest.advanceTimersByTime(3000);

		wrapper.update();

		expect(wrapper.find("AppLayout").state("openKeys")).toEqual([]);
		expect(wrapper.find("AppLayout").state("selectedKey")).toContain(
			"events/viewall",
		);
	});

	it("handles Drawer Menu open and closing", () => {
		wrapper.find("AppLayout").instance().toggleDrawerMenu();

		expect(wrapper.find("AppLayout").state("openKeys")).toEqual([]);
		expect(wrapper.find("AppLayout").state("showDrawer")).toBeTruthy();
	});
});
