import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Row } from "antd";
import Head from "~components/Navigation/Head";
import Events from "./Events";
import Forms from "./Forms";
import Availability from "./Availability";
import MembersAvailability from "./MembersAvailability";
import EventDistribution from "./EventDistribution";

export const ViewDashboard = ({ role }) => (
	<>
		<Head title="Dashboard" />
		<Row gutter={[24, 24]}>
			<Events />
			<Forms />
			{role !== "employee" ? <MembersAvailability /> : <Availability />}
			<EventDistribution />
		</Row>
	</>
);

ViewDashboard.propTypes = {
	role: PropTypes.string.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
	role: state.auth.role,
});

export default connect(mapStateToProps)(ViewDashboard);
