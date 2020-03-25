import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { requiresBasicUserCreds } from "~actions/Auth";
import Spinner from "~components/Body/Spinner";

const requiresBasicCredentials = WrappedComponent => {
	class RequiresAuthentication extends PureComponent {
		static async getInitialProps(ctx) {
			const {
				store: { dispatch, getState },
			} = ctx;

			const { role, email } = getState().auth;

			if (!role || !email) await dispatch(requiresBasicUserCreds(ctx));

			if (WrappedComponent.getInitialProps)
				await WrappedComponent.getInitialProps(ctx);
		}

		render = () =>
			this.props.email && this.props.role && this.props.role !== "guest" ? (
				<WrappedComponent {...this.props} />
			) : (
				<Spinner />
			);
	}

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
