import React, { Component } from "react";
import PropTypes from "prop-types";
import { Layout } from "antd";
import AppRoutes from "routes/AppRoutes";
// import BuildVersion from "components/Body/BuildVersion";
import LeftMenu from "~components/Navigation/LeftMenu";
import RightMenu from "~components/Navigation/RightMenu";
import SideMenu from "~components/Navigation/SideMenu";
import DrawerMenu from "~components/Navigation/DrawerMenu";
import { TABS, ROOTTABS } from "./Tabs";

const Header = Layout.Header;
const Content = Layout.Content;

const selectedTab = path => TABS.filter(tab => path.indexOf(tab) >= 1);

const openedKey = path => {
	const opened = ROOTTABS.find(tab => path.includes(tab));

	return opened ? [opened] : [];
};

class App extends Component {
	constructor(props) {
		super(props);

		const {
			location: { pathname },
		} = props;

		this.state = {
			isCollapsed: false,
			hideSideBar: false,
			showDrawer: false,
			openKeys: openedKey(pathname),
			selectedKey: selectedTab(pathname),
		};
	}

	componentDidUpdate = (prevProps, prevState) => {
		const { pathname } = this.props.location;
		const { isCollapsed, hideSideBar, showDrawer } = this.state;

		if (prevProps.location.pathname !== pathname) {
			this.setState(prevState => ({
				openKeys: !prevState.isCollapsed ? openedKey(pathname) : [],
				selectedKey: selectedTab(pathname),
				showDrawer: false,
			}));
		}

		if (
			(prevState.isCollapsed !== isCollapsed && !isCollapsed && !hideSideBar) ||
			(prevState.showDrawer !== showDrawer && showDrawer && hideSideBar)
		) {
			this.setState({
				openKeys: openedKey(pathname),
			});
		}
	};

	handleBreakpoint = isBroken => {
		const { pathname } = this.props.location;
		this.setState(prevState => ({
			...prevState,
			isCollapsed: isBroken,
			hideSideBar: isBroken,
			openKeys: isBroken ? [] : openedKey(pathname),
			showDrawer: false,
		}));
	};

	handleOpenMenuChange = openKeys => {
		const latestOpenKey = openKeys.find(
			key => this.state.openKeys.indexOf(key) === -1,
		);

		const containsLatestKey = ROOTTABS.indexOf(latestOpenKey) === -1;

		this.setState({ openKeys: containsLatestKey ? openKeys : [latestOpenKey] });
	};

	handleTabClick = ({
		key,
		item: {
			props: { value },
		},
	}) => {
		this.setState(() => {
			this.props.push(`/employee/${value}`);
			const openKeys = ROOTTABS.find(tab => key.includes(tab));

			return {
				openKeys: openKeys ? [openKeys] : [],
			};
		});
	};

	toggleDrawerMenu = () =>
		this.setState(prevState => ({
			openKeys: [],
			showDrawer: !prevState.showDrawer,
		}));

	toggleSideMenu = () =>
		this.setState(prevState => ({
			openKeys: [],
			isCollapsed: !prevState.isCollapsed,
			showDrawer: !prevState.showDrawer,
		}));

	render = () => (
		<div id="app">
			<Layout>
				<SideMenu
					{...this.state}
					role={this.props.role}
					onHandleBreakpoint={this.handleBreakpoint}
					onHandleTabClick={this.handleTabClick}
					onHandleOpenMenuChange={this.handleOpenMenuChange}
				/>
				<Layout>
					<Header>
						<LeftMenu toggleSideMenu={this.toggleSideMenu} />
						<RightMenu {...this.props} />
					</Header>
					<Content>
						<AppRoutes {...this.props} />
						{/* <BuildVersion /> */}
					</Content>
				</Layout>
			</Layout>
			{this.state.hideSideBar && (
				<DrawerMenu
					{...this.state}
					role={this.props.role}
					onHandleTabClick={this.handleTabClick}
					onHandleToggleDrawer={this.toggleDrawerMenu}
					onHandleOpenMenuChange={this.handleOpenMenuChange}
				/>
			)}
		</div>
	);
}

App.propTypes = {
	firstName: PropTypes.string.isRequired,
	lastName: PropTypes.string.isRequired,
	location: PropTypes.shape({
		pathname: PropTypes.string,
	}),
	push: PropTypes.func.isRequired,
	match: PropTypes.shape({
		url: PropTypes.string,
	}).isRequired,
	role: PropTypes.string.isRequired,
};

export default App;
