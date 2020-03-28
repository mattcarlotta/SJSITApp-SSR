import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signoutUser } from "~actions/Auth";
import Head from "~components/Navigation/Head";
import Link from "~components/Navigation/Link";

const Home = ({ email, signoutUser }) => (
	<>
		<Head title="Home" />
		<div>Welcome!</div>
		<Link blue href="/employee/login">
			Login
		</Link>
		{email && (
			<>
				<div>Signed in: {email}</div>
				<Link blue href="/employee/dashboard">
					Dashboard
				</Link>
				<button type="button" onClick={signoutUser}>
					Sign Out
				</button>
			</>
		)}
	</>
);

Home.propTypes = {
	email: PropTypes.string,
	signoutUser: PropTypes.func,
};

const mapStateToProps = ({ auth }) => ({ email: auth.email });

const mapDispatchToProps = {
	signoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
