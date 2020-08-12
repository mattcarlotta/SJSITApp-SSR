import React from "react";
import PropTypes from "prop-types";
import { Layout } from "antd";
import NavMenu from "~components/Navigation/NavMenu";

const Sider = Layout.Sider;

const SideMenu = ({
	isCollapsed,
	hideSideBar,
	onHandleBreakpoint,
	...rest
}) => {
	const style = hideSideBar ? { display: "none" } : { background: "#1f1f23" };

	return (
		<Sider
			breakpoint="xl"
			width={266}
			trigger={null}
			onBreakpoint={onHandleBreakpoint}
			collapsible
			collapsed={isCollapsed}
			style={{ ...style, overflow: "auto" }}
		>
			{!hideSideBar && <NavMenu isCollapsed={isCollapsed} {...rest} />}
		</Sider>
	);
};

SideMenu.propTypes = {
	isCollapsed: PropTypes.bool.isRequired,
	hideSideBar: PropTypes.bool.isRequired,
	onHandleBreakpoint: PropTypes.func.isRequired,
};

export default SideMenu;
