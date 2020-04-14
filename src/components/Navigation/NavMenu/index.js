import React from "react";
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

const titleStyle = {
	color: "#fff",
	margin: 0,
	padding: "4px 0",
	fontSize: 26,
	textShadow: "1px 2px 2px #000000",
};

const NavMenu = ({
	isCollapsed,
	onHandleTabClick,
	onHandleOpenMenuChange,
	openKeys,
	role,
	selectedKey,
}) => {
	const TABS = role !== "employee" ? StaffRoutes : EmployeeRoutes;

	return (
		<>
			<Center
				style={{
					height: 64,
					background:
						"linear-gradient(90deg, #1f1f23 0%, #145e6b 50%, #1f1f23 100%)",
					borderBottom: "1px solid #3d8792",
				}}
			>
				<Link href="/" style={{ padding: 0, margin: 0 }}>
					<div css="text-align:center;padding: 12px 18px 0 18px;">
						{isCollapsed ? (
							<div css="border: 1px solid #fff;">
								<Title style={titleStyle}>IT</Title>
							</div>
						) : (
							<Title style={titleStyle}>Sharks Ice Team</Title>
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
				{TABS.map(({ icon, divider, key, tab, submenu, value }) =>
					divider ? (
						<Divider
							key={key}
							style={{ backgroundColor: "#3d8792", margin: "20px 0" }}
						/>
					) : !submenu ? (
						<MenuItem value={key} key={key}>
							<Tab href={`/employee/${value}`}>
								<i className="anticon">{icon}</i>
								<span className={`${isCollapsed ? "hidden" : undefined}`}>
									{tab}
								</span>
							</Tab>
						</MenuItem>
					) : (
						<SubMenu
							key={key}
							title={
								<>
									<i className="anticon">{icon}</i>
									<span css="font-size: 18px;text-transform: capitalize;user-select: none;">
										{tab}
									</span>
								</>
							}
						>
							{submenu.map(({ icon, disabled, tab, value, key }) => (
								<MenuItem disabled={disabled} value={value} key={key}>
									<Tab href={`/employee/${value}`}>
										<i className="anticon">{icon}</i>
										<span className={`${isCollapsed ? "hidden" : undefined}`}>
											{tab}
										</span>
									</Tab>
								</MenuItem>
							))}
						</SubMenu>
					),
				)}
			</Menu>
			{!isCollapsed && <Legal>© 2019-2020 Matt Carlotta</Legal>}
		</>
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
