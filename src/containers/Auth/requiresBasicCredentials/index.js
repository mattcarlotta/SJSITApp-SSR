import React, { PureComponent } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { setServerMessage } from "~actions/Messages";
import { accessDenied } from "~messages/errors";
import Redirect from "~utils/redirect";
import toast from "~components/Body/Toast";
import Spinner from "~components/Body/Spinner";

const requiresBasicCredentials = WrappedComponent => {
	class RequiresAuthentication extends PureComponent {
		static async getInitialProps(ctx) {
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
