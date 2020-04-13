import { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ToastContainer } from "react-toastify";
import { resetServerMessage } from "~actions/Messages";

export class ServerMessages extends Component {
	shouldComponentUpdate = nextProps =>
		nextProps.serverMessage !== this.props.serverMessage;

	componentDidUpdate = prevProps => {
		const { serverMessage } = this.props;
		if (prevProps.serverMessage !== serverMessage && serverMessage !== "") {
			clearTimeout(this.timeout);
			this.setTimer();
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
	resetServerMessage: PropTypes.func.isRequired,
	serverMessage: PropTypes.string,
};

const mapStateToProps = ({ server }) => ({
	serverMessage: server.message,
});

const mapDispatchToProps = {
	resetServerMessage,
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerMessages);
