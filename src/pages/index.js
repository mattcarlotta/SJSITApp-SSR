import React, { Component } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { connect } from "react-redux";
import Button from "~components/Body/Button";
import FlexCenter from "~components/Body/FlexCenter";
import HomeLogo from "~components/Body/HomeLogo";
import Spinner from "~components/Body/Spinner";
import Head from "~components/Navigation/Head";

class Home extends Component {
	state = { isMounted: false, isIE: false, isEdge: false };

	componentDidMount() {
		const isIE = /* @cc_on!@ */ false || !!document.documentMode;
		const isEdge = !isIE && !!window.StyleMedia;
		this.setState({ isMounted: true, isIE, isEdge });
	}

	render = () => {
		const { isEdge, isIE, isMounted } = this.state;
		const { role } = this.props;
		const isLoggedin = role && role !== "guest";

		return (
			<>
				<Head title="Home" />
				{!isMounted ? null : isIE || isEdge ? (
					<div css="background: #010404;height: 100%;">
						<FlexCenter style={{ height: "100%" }} direction="column">
							<HomeLogo />
							<Button
								tertiary
								marginRight="0px"
								width="200px"
								style={{ margin: "30px auto 0" }}
								onClick={() =>
									Router.push(
										isLoggedin ? "/employee/dashboard" : "/employee/login",
									)
								}
							>
								{isLoggedin ? "Go To Dashboard" : "Employee Login"}
							</Button>
						</FlexCenter>
					</div>
				) : (
					<Spinner>
						<Button
							tertiary
							marginRight="0px"
							width="200px"
							style={{ margin: "20px auto 0" }}
							onClick={() =>
								Router.push(
									isLoggedin ? "/employee/dashboard" : "/employee/login",
								)
							}
						>
							{isLoggedin ? "Go To Dashboard" : "Employee Login"}
						</Button>
					</Spinner>
				)}
			</>
		);
	};
}

Home.propTypes = {
	role: PropTypes.string,
};

/* istanbul ignore next */
const mapStateToProps = ({ auth }) => ({ role: auth.role });

export default connect(mapStateToProps)(Home);
