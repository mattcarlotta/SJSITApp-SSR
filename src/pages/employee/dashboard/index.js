import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import requiresBasicCredentials from "~containers/Auth/requiresBasicCredentials";
import AppLayout from "~components/App";

const Dashboard = ({ firstName, lastName }) => (
	<AppLayout>
		<div>
			Welcome to the SJS Ice Team App, {firstName} {lastName}
		</div>
		<div css="height: 100vh" />
	</AppLayout>
);

Dashboard.propTypes = {
	firstName: PropTypes.string,
	lastName: PropTypes.string,
};

const mapStateToProps = ({ auth }) => ({
	firstName: auth.firstName,
	lastName: auth.lastName,
});

export default connect(mapStateToProps)(requiresBasicCredentials(Dashboard));
