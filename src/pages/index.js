import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { signoutUser } from "~actions/Auth";
import Head from "~components/Navigation/Head";
import Link from "~components/Navigation/Link";

const Home = ({ email, signoutUser }) => (
	<>
		<Head title="Dashboard" />
		<div>Welcome!</div>
		<Link blue href="/employee/login">
			Login
		</Link>

		{email && (
			<>
				<div>Signed in: {email}</div>
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

export default connect(({ auth }) => ({ email: auth.email }), { signoutUser })(
	Home,
);
