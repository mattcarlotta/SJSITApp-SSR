import React from "react";
import PropTypes from "prop-types";
import { FaBars } from "react-icons/fa";
import MenuButton from "components/Body/MenuButton";

const LeftMenu = ({ toggleSideMenu }) => (
	<MenuButton
		hoverable
		aria-label="collapse navigation button"
		style={{ padding: "0 20px", height: 64 }}
		onClick={toggleSideMenu}
	>
		<FaBars style={{ verticalAlign: "middle" }} />
	</MenuButton>
);

LeftMenu.propTypes = {
	toggleSideMenu: PropTypes.func.isRequired,
};

export default LeftMenu;
