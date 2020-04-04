import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { resetServerMessage } from "~actions/Messages";
import { signoutUser } from "~actions/Auth";

export class ServerMessages extends Component {
	shouldComponentUpdate = nextProps =>
		nextProps.serverMessage !== this.props.serverMessage;

	componentDidUpdate = prevProps => {
		const { role, serverMessage, signoutUser } = this.props;
		if (prevProps.serverMessage !== serverMessage && serverMessage !== "") {
			clearTimeout(this.timeout);
			this.setTimer();
		}

		if (
			prevProps.serverMessage !== serverMessage &&
			role &&
			serverMessage.indexOf("account was revoked") >= 0
		) {
			signoutUser();
		}
	};

	componentWillUnmount = () => this.clearTimer();

	clearTimer = () => {
		clearTimeout(this.timeout);
		this.props.resetServerMessage();
	};

	setTimer = () => (this.timeout = setTimeout(this.clearTimer, 2000));

	render = () => (
		<ToastContainer
			position="top-right"
			autoClose={8000}
			hideProgressBar={false}
			newestOnTop={false}
			draggable={false}
			pauseOnVisibilityChange
			closeOnClick
			pauseOnHover
		/>
	);
}

ServerMessages.propTypes = {
	role: PropTypes.string,
	resetServerMessage: PropTypes.func.isRequired,
	serverMessage: PropTypes.string,
	signoutUser: PropTypes.func.isRequired,
};

const mapStateToProps = ({ auth, server }) => ({
	role: auth.role,
	serverMessage: server.message,
});

const mapDispatchToProps = {
	resetServerMessage,
	signoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerMessages);
