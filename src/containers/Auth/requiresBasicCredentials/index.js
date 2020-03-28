import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import checkAuthentication from "~utils/checkAuthentication";
import Spinner from "~components/Body/Spinner";
import AppLayout from "~components/App";

const requiresBasicCredentials = WrappedComponent => {
	const RequiresAuthentication = ({ email, role, ...rest }) =>
		email && role && role !== "guest" ? (
			<AppLayout>
				<WrappedComponent {...rest} />
			</AppLayout>
		) : (
			<Spinner />
		);

	RequiresAuthentication.getInitialProps = async ctx => {
		const {
			store: { getState },
		} = ctx;
		const { role, email } = getState().auth;
		const { getInitialProps } = WrappedComponent;

		await checkAuthentication({
			condition: role === "guest" || !email,
			ctx,
			getInitialProps,
		});
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
