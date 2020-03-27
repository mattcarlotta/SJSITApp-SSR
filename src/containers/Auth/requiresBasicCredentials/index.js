import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setServerMessage } from "~actions/Messages";
import { accessDenied } from "~messages/errors";
import Redirect from "~utils/redirect";
import toast from "~components/Body/Toast";
import Spinner from "~components/Body/Spinner";

const requiresBasicCredentials = WrappedComponent => {
	const RequiresAuthentication = ({ email, role, ...rest }) =>
		email && role && role !== "guest" ? (
			<WrappedComponent {...rest} />
		) : (
			<Spinner />
		);

	RequiresAuthentication.getInitialProps = async ctx => {
		const {
			store: { dispatch, getState },
			res,
		} = ctx;

		const { role, email } = getState().auth;

		if (role === "guest" || !email) {
			dispatch(setServerMessage({ message: accessDenied }));
			toast({ type: "error", message: accessDenied });
			Redirect(res);
		}

		if (WrappedComponent.getInitialProps)
			await WrappedComponent.getInitialProps(ctx);
	};

	RequiresAuthentication.propTypes = {
		email: PropTypes.string,
		role: PropTypes.string,
	};

	const mapStateToProps = ({ auth }) => ({
		email: auth.email,
		role: auth.role,
	});

	return connect(mapStateToProps)(RequiresAuthentication);
};

requiresBasicCredentials.propTypes = {
	WrappedComponent: PropTypes.node.isRequired,
};

export default requiresBasicCredentials;
