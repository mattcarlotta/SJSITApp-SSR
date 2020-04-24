import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { connect } from "react-redux";
import Button from "~components/Body/Button";
import Spinner from "~components/Body/Spinner";
import Head from "~components/Navigation/Head";

const Home = ({ role }) => {
	const isLoggedin = role && role !== "guest";

	return (
		<>
			<Head title="Home" />
			<Spinner>
				<Button
					tertiary
					marginRight="0px"
					width="200px"
					style={{ margin: "20px auto 0" }}
					onClick={() =>
						Router.push(isLoggedin ? "/employee/dashboard" : "/employee/login")
					}
				>
					{isLoggedin ? "Go To Dashboard" : "Employee Login"}
				</Button>
			</Spinner>
		</>
	);
};

Home.propTypes = {
	role: PropTypes.string,
};

/* istanbul ignore next */
const mapStateToProps = ({ auth }) => ({ role: auth.role });

export default connect(mapStateToProps)(Home);
