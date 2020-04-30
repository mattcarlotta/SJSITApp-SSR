import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { withRouter } from "next/router";
import { Layout } from "antd";
import LeftMenu from "~components/Navigation/LeftMenu";
import RightMenu from "~components/Navigation/RightMenu";
import SideMenu from "~components/Navigation/SideMenu";
import DrawerMenu from "~components/Navigation/DrawerMenu";
import { setSidebarState } from "~actions/Auth";
import { TABS, ROOTTABS } from "./Tabs";

const Header = Layout.Header;
const Content = Layout.Content;

const selectedTab = path => TABS.filter(tab => path.indexOf(tab) >= 1);

const openedKey = path => {
	const opened = ROOTTABS.find(tab => path.includes(tab));

	return opened ? [opened] : [];
};

export class AppLayout extends Component {
	constructor(props) {
		super(props);

		const { pathname } = props.router;
		const { isCollapsed } = props;

		this.state = {
			hideSideBar: false,
			showDrawer: false,
			openKeys: !isCollapsed ? openedKey(pathname) : [],
			selectedKey: selectedTab(pathname),
		};
	}

	componentDidUpdate = (prevProps, prevState) => {
		const { pathname } = this.props.router;
		const { hideSideBar, showDrawer } = this.state;
		const { isCollapsed } = this.props;

		if (
			(prevProps.isCollapsed !== isCollapsed && !isCollapsed && !hideSideBar) ||
			(prevState.showDrawer !== showDrawer && showDrawer && hideSideBar)
		) {
			this.setState({
				openKeys: openedKey(pathname),
			});
		}
	};

	handleBreakpoint = isBroken => {
		const { router, isCollapsed } = this.props;

		this.setState({
			hideSideBar: isBroken,
			openKeys: isCollapsed || isBroken ? [] : openedKey(router.pathname),
			showDrawer: false,
		});
	};

	handleOpenMenuChange = openKeys => {
		const latestOpenKey = openKeys.find(
			key => this.state.openKeys.indexOf(key) === -1,
		);

		const containsLatestKey = ROOTTABS.indexOf(latestOpenKey) === -1;

		this.setState({ openKeys: containsLatestKey ? openKeys : [latestOpenKey] });
	};

	handleTabClick = ({ key }) => {
		const openKeys = ROOTTABS.find(tab => key.includes(tab));
		this.setState({
			openKeys: openKeys ? [openKeys] : [],
		});
	};

	toggleDrawerMenu = () =>
		this.setState(prevState => ({
			openKeys: [],
			showDrawer: !prevState.showDrawer,
		}));

	toggleSideMenu = () =>
		this.setState(
			prevState => ({
				openKeys: [],
				showDrawer: !prevState.showDrawer,
			}),
			() => {
				if (!this.state.hideSideBar) this.props.setSidebarState();
			},
		);

	render = () => (
		<div id="app">
			<Layout>
				<SideMenu
					{...this.state}
					{...this.props}
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
						<div css="padding-bottom: 40px;">{this.props.children}</div>
					</Content>
				</Layout>
			</Layout>
			{this.state.hideSideBar && (
				<DrawerMenu
					{...this.state}
					{...this.props}
					onHandleTabClick={this.handleTabClick}
					onHandleToggleDrawer={this.toggleDrawerMenu}
					onHandleOpenMenuChange={this.handleOpenMenuChange}
				/>
			)}
		</div>
	);
}

AppLayout.propTypes = {
	children: PropTypes.node.isRequired,
	isCollapsed: PropTypes.bool.isRequired,
	firstName: PropTypes.string.isRequired,
	lastName: PropTypes.string.isRequired,
	router: PropTypes.shape({
		pathname: PropTypes.string,
	}),
	role: PropTypes.string.isRequired,
	setSidebarState: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = ({ auth }) => ({
	isCollapsed: auth.isCollapsed,
	firstName: auth.firstName,
	lastName: auth.lastName,
	role: auth.role,
});

/* istanbul ignore next */
const mapDispatchToProps = {
	setSidebarState,
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(AppLayout),
);
