import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import App from "~components/App";
import AppLoader from "~containers/Auth/AppLoader";
import NewPasswordForm from "~containers/Forms/Auth/NewPasswordForm";
import ResetPasswordForm from "~containers/Forms/Auth/ResetPasswordForm";
import SignupForm from "~containers/Forms/Auth/SignupForm";
import { signin } from "~actions/Auth";

export const authError =
	"There was a problem with your login credentials. Please make sure your username and password are correct.";

export const sessionError =
	"Your login session has expired. Please log into your account again.";

export class ProtectedRoutes extends PureComponent {
	componentDidUpdate = prevProps => {
		const { serverMessage, role, signin } = this.props;

		if (
			prevProps.serverMessage !== serverMessage &&
			(serverMessage === authError || serverMessage === sessionError) &&
			role !== "guest"
		) {
			signin({ role: "guest" });
		}
	};

	render = () => {
		const { url } = this.props.match;
		return (
			<Switch>
				<Route
					exact
					path={`${url}/newpassword/:id`}
					component={NewPasswordForm}
				/>
				<Route
					exact
					path={`${url}/resetpassword`}
					component={ResetPasswordForm}
				/>
				<Route path={`${url}/signup`} component={SignupForm} />
				{!this.props.role || this.props.role === "guest" ? (
					<Route path={`${url}`} component={AppLoader} />
				) : (
					<Route
						render={/* istanbul ignore next */ () => <App {...this.props} />}
					/>
				)}
			</Switch>
		);
	};
}

ProtectedRoutes.propTypes = {
	firstName: PropTypes.string,
	lastName: PropTypes.string,
	location: PropTypes.shape({
		pathname: PropTypes.string,
	}),
	match: PropTypes.shape({
		url: PropTypes.string,
	}).isRequired,
	role: PropTypes.string,
	serverMessage: PropTypes.string,
	signin: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
	firstName: state.auth.firstName,
	lastName: state.auth.lastName,
	role: state.auth.role,
	serverMessage: state.server.message,
});

/* istanbul ignore next */
const mapDispatchToProps = {
	signin,
};

export default connect(mapStateToProps, mapDispatchToProps)(ProtectedRoutes);
