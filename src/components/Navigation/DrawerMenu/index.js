import React from "react";
import PropTypes from "prop-types";
import { Drawer } from "antd";
import NavMenu from "~components/Navigation/NavMenu";

const DrawerMenu = ({ onHandleToggleDrawer, showDrawer, ...rest }) => (
	<Drawer
		closable={false}
		placement="left"
		onClose={onHandleToggleDrawer}
		visible={showDrawer}
	>
		<NavMenu {...rest} isCollapsed={false} />
	</Drawer>
);

DrawerMenu.propTypes = {
	showDrawer: PropTypes.bool.isRequired,
	onHandleToggleDrawer: PropTypes.func.isRequired,
};

export default DrawerMenu;
