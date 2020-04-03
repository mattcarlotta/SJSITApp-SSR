import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { connect } from "react-redux";
import { Menu, Dropdown } from "antd";
import { FaUserCircle, FaSignOutAlt, FaCogs } from "react-icons/fa";
import { signoutUser } from "~actions/Auth";
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
				{avatar ? (
					<img src={avatar} alt="avatar" width="30px" />
				) : (
					<FaUserCircle style={{ verticalAlign: "middle", fontSize: 30 }} />
				)}
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

const mapDispatchToProps = {
	signoutUser,
};

export default connect(null, mapDispatchToProps)(AccountButton);
