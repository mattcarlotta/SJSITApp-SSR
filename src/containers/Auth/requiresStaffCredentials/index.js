import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import checkAuthentication from "~utils/checkAuthentication";
import Spinner from "~components/Body/Spinner";

const requiresStaffCredentials = WrappedComponent => {
	const RequiresStaffAuthentication = ({ email, role, ...rest }) =>
		email && role && (role === "staff" || role === "admin") ? (
			<WrappedComponent {...rest} />
		) : (
			<Spinner />
		);

	RequiresStaffAuthentication.getInitialProps = async ctx => {
		const {
			store: { getState },
		} = ctx;
		const { role, email } = getState().auth;
		const { getInitialProps } = WrappedComponent;

		await checkAuthentication({
			condition: (role !== "staff" && role !== "admin") || !email,
			ctx,
			getInitialProps,
		});
	};

	RequiresStaffAuthentication.propTypes = {
		email: PropTypes.string,
		role: PropTypes.string,
	};

	const mapStateToProps = ({ auth }) => ({
		email: auth.email,
		role: auth.role,
	});

	return connect(mapStateToProps)(RequiresStaffAuthentication);
};

requiresStaffCredentials.propTypes = {
	WrappedComponent: PropTypes.node.isRequired,
};

export default requiresStaffCredentials;
