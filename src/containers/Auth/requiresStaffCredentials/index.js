import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Router, { withRouter } from "next/router";
import Spinner from "~components/Body/Spinner";
import AppLayout from "~components/App";
import FadeIn from "~components/Body/FadeIn";
import { accessDenied } from "~messages/errors";
import { signoutUser } from "~actions/Auth";
import toast from "~components/Body/Toast";

const requiresStaffCredentials = WrappedComponent => {
	class RequiresStaffAuthentication extends Component {
		static getInitialProps = async ctx => {
			const {
				store: { getState },
			} = ctx;
			const { role, email } = getState().auth;
			const { getInitialProps } = WrappedComponent;

			if ((role !== "staff" && role !== "admin") || !email)
				return { serverError: accessDenied };

			if (getInitialProps) return getInitialProps(ctx);
		};

		componentDidMount = () => {
			const { email, router, serverError, signoutUser } = this.props;

			if (serverError) {
				if (
					serverError.indexOf("account was revoked") >= 0 ||
					serverError.indexOf(
						"There was a problem with your login credentials",
					) >= 0
				) {
					signoutUser();
				} else if (!email || router.pathname !== "/employee/dashboard") {
					Router.push("/employee/login");
				}

				toast({ type: "error", message: serverError });
			}
		};

		render = () =>
			this.props.email &&
			this.props.role &&
			(this.props.role === "staff" || this.props.role === "admin") ? (
				<AppLayout>
					<WrappedComponent {...this.props} />
				</AppLayout>
			) : (
				<FadeIn style={{ height: "100%" }} timing="1.5s">
					<Spinner />
				</FadeIn>
			);
	}

	RequiresStaffAuthentication.propTypes = {
		email: PropTypes.string,
		role: PropTypes.string,
		router: PropTypes.shape({
			pathname: PropTypes.string,
		}),
		serverError: PropTypes.string,
		signoutUser: PropTypes.func.isRequired,
	};

	/* istanbul ignore next */
	const mapStateToProps = ({ auth }) => ({
		email: auth.email,
		role: auth.role,
	});

	return withRouter(
		connect(mapStateToProps, { signoutUser })(RequiresStaffAuthentication),
	);
};

requiresStaffCredentials.propTypes = {
	WrappedComponent: PropTypes.node.isRequired,
};

export default requiresStaffCredentials;
