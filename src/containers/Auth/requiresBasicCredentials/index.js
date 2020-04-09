import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Router from "next/router";
import Spinner from "~components/Body/Spinner";
import AppLayout from "~components/App";
import { accessDenied } from "~messages/errors";
import toast from "~components/Body/Toast";

const requiresBasicCredentials = WrappedComponent => {
	class RequiresAuthentication extends Component {
		static getInitialProps = async ctx => {
			const {
				store: { getState },
			} = ctx;
			const { role, email } = getState().auth;
			const { getInitialProps } = WrappedComponent;

			if (role === "guest" || !email) return { serverError: accessDenied };

			if (getInitialProps) return getInitialProps(ctx);
		};

		componentDidMount = () => {
			const { serverError } = this.props;
			if (serverError) {
				Router.push("/employee/login");
				toast({ type: "error", message: serverError });
			}
		};

		render = () =>
			this.props.email && this.props.role && this.props.role !== "guest" ? (
				<AppLayout>
					<WrappedComponent {...this.props} />
				</AppLayout>
			) : (
				<Spinner />
			);
	}

	RequiresAuthentication.propTypes = {
		email: PropTypes.string,
		role: PropTypes.string,
		serverError: PropTypes.string,
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
