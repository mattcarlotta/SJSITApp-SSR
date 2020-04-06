import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { connect } from "react-redux";
import { Menu, Dropdown } from "antd";
import { FaSignOutAlt, FaCogs } from "react-icons/fa";
import { signoutUser } from "~actions/Auth";
import DisplayAvatar from "~components/Body/DisplayAvatar";
import MenuButton from "~components/Body/MenuButton";
import MenuItemContainer from "~components/Body/MenuItemContainer";
import MenuItemTitle from "~components/Body/MenuItemTitle";

const MenuItem = Menu.Item;

export const AccountButton = ({ avatar, firstName, lastName, signoutUser }) => {
	const options = (
		<Menu style={{ padding: 0 }}>
			<MenuItem>
				<MenuButton
					style={{ width: "100%" }}
					onClick={() => Router.push("/employee/settings")}
				>
					<MenuItemContainer>
						<FaCogs />
						<MenuItemTitle>Settings</MenuItemTitle>
					</MenuItemContainer>
				</MenuButton>
			</MenuItem>
			<MenuItem>
				<MenuButton style={{ width: "100%" }} onClick={signoutUser}>
					<MenuItemContainer>
						<FaSignOutAlt />
						<MenuItemTitle>Logout</MenuItemTitle>
					</MenuItemContainer>
				</MenuButton>
			</MenuItem>
		</Menu>
	);

	return (
		<Dropdown overlay={options} trigger={["click"]} placement="bottomCenter">
			<MenuButton
				hoverable
				style={{ padding: "0 20px", marginRight: 0, height: 64 }}
			>
				<DisplayAvatar avatar={avatar} />
				<MenuItemTitle
					className="loggedin-user"
					style={{ verticalAlign: "middle" }}
				>
					<span className="firstname">{firstName}</span>
					<span className="lastname">&nbsp;{lastName}</span>
				</MenuItemTitle>
			</MenuButton>
		</Dropdown>
	);
};

AccountButton.propTypes = {
	avatar: PropTypes.string,
	firstName: PropTypes.string.isRequired,
	lastName: PropTypes.string.isRequired,
	signoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth }) => ({ avatar: auth.avatar });

const mapDispatchToProps = {
	signoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(AccountButton);
