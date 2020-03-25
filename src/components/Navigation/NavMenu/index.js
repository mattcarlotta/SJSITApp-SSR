import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Menu } from "antd";
import Center from "~components/Body/Center";
import Legal from "~components/Body/Legal";
import Tab from "~components/Body/Tab";
import Title from "~components/Body/Title";
import Link from "~components/Navigation/Link";
import { StaffRoutes, EmployeeRoutes } from "./Tabs";

const MenuItem = Menu.Item;
const SubMenu = Menu.SubMenu;
const Divider = Menu.Divider;

const NavMenu = ({
	role,
	isCollapsed,
	onHandleTabClick,
	onHandleOpenMenuChange,
	openKeys,
	selectedKey,
}) => {
	const TABS = role !== "employee" ? StaffRoutes : EmployeeRoutes;

	return (
		<Fragment>
			<Center
				style={{
					height: 64,
					backgroundColor: "#025f6d",
					borderBottom: "1px solid #3d8792",
				}}
			>
				<Link href="/" style={{ padding: 0, margin: 0 }}>
					<div css="text-align:center;padding: 12px 18px 0 18px;">
						{isCollapsed ? (
							<div css="border: 1px solid #fff;">
								<Title
									style={{
										color: "#fff",
										margin: 0,
										padding: "4px 0",
										fontSize: 26,
									}}
								>
									IT
								</Title>
							</div>
						) : (
							<Title
								style={{
									color: "#fff",
									margin: 0,
									padding: "4px 0",
									fontSize: 26,
								}}
							>
								Ice Team
							</Title>
						)}
					</div>
				</Link>
			</Center>
			<Menu
				theme="dark"
				mode="inline"
				openKeys={openKeys}
				onOpenChange={onHandleOpenMenuChange}
				onSelect={onHandleTabClick}
				selectedKeys={selectedKey}
			>
				{TABS.map(({ icon, divider, key, tab, submenu }) =>
					divider ? (
						<Divider
							key={key}
							style={{ backgroundColor: "#3d8792", margin: "20px 0" }}
						/>
					) : !submenu ? (
						<MenuItem value={key} key={key}>
							<i className="anticon">{icon}</i>
							<Tab>{tab}</Tab>
						</MenuItem>
					) : (
						<SubMenu
							key={key}
							title={
								<Fragment>
									<i className="anticon">{icon}</i>
									<Tab>{tab}</Tab>
								</Fragment>
							}
						>
							{submenu.map(({ icon, disabled, tab, value, key }) => (
								<MenuItem disabled={disabled} value={value} key={key}>
									<i className="anticon">{icon}</i>
									<Tab>{tab}</Tab>
								</MenuItem>
							))}
						</SubMenu>
					),
				)}
			</Menu>
			{!isCollapsed && <Legal>© 2019 Matt Carlotta</Legal>}
		</Fragment>
	);
};

NavMenu.propTypes = {
	isCollapsed: PropTypes.bool.isRequired,
	onHandleOpenMenuChange: PropTypes.func.isRequired,
	onHandleTabClick: PropTypes.func.isRequired,
	openKeys: PropTypes.arrayOf(PropTypes.string),
	role: PropTypes.string.isRequired,
	selectedKey: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default NavMenu;
