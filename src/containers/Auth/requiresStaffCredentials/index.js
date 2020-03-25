import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { requiresStaffCreds } from "~actions/Auth";
import Spinner from "~components/Body/Spinner";

const requiresStaffCredentials = WrappedComponent => {
	class RequiresStaffAuthentication extends PureComponent {
		static async getInitialProps(ctx) {
			const {
				store: { dispatch, getState },
			} = ctx;

			const { role, email } = getState().auth;

			if (role !== "staff" || !email) await dispatch(requiresStaffCreds(ctx));

			if (WrappedComponent.getInitialProps)
				await WrappedComponent.getInitialProps(ctx);
		}

		render = () =>
			this.props.email && this.props.role && this.props.role === "staff" ? (
				<WrappedComponent {...this.props} />
			) : (
				<Spinner />
			);
	}

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
