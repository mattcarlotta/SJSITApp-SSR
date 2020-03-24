import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Spinner from "~components/Body/Spinner";
import LoginForm from "~containers/Forms/Auth/LoginForm";
import { authenticateUser } from "~actions/Auth";

export class AppLoader extends PureComponent {
	componentDidMount = () => {
		const { authenticateUser, role } = this.props;

		if (role !== "guest") {
			authenticateUser();
		}
	};

	render = () => (this.props.role === "guest" ? <LoginForm /> : <Spinner />);
}

AppLoader.propTypes = {
	authenticateUser: PropTypes.func.isRequired,
	role: PropTypes.string,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
	role: state.auth.role,
	serverMessage: state.server.message,
});

/* istanbul ignore next */
const mapDispatchToProps = {
	authenticateUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(AppLoader);
