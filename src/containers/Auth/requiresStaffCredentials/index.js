import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setServerMessage } from "~actions/Messages";
import { accessDenied } from "~messages/errors";
import Redirect from "~utils/redirect";
import toast from "~components/Body/Toast";
import Spinner from "~components/Body/Spinner";

const requiresStaffCredentials = WrappedComponent => {
	const RequiresStaffAuthentication = ({ email, role, ...rest }) =>
		email && role && role === "staff" ? (
			<WrappedComponent {...rest} />
		) : (
			<Spinner />
		);

	RequiresStaffAuthentication.getInitialProps = async ctx => {
		const {
			store: { dispatch, getState },
			res,
		} = ctx;

		const { role, email } = getState().auth;

		if (role !== "staff" || !email) {
			dispatch(setServerMessage({ message: accessDenied }));
			toast({ type: "error", message: accessDenied });
			Redirect(res);
		}

		if (WrappedComponent.getInitialProps)
			await WrappedComponent.getInitialProps(ctx);
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
