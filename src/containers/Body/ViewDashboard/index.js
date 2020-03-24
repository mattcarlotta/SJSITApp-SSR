import React, { Fragment } from "react";
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
	<Fragment>
		<Head title="Dashboard" />
		<Row gutter={[24, 24]}>
			<Events />
			<Forms />
			{role !== "employee" ? <MembersAvailability /> : <Availability />}
			<EventDistribution />
		</Row>
	</Fragment>
);

ViewDashboard.propTypes = {
	role: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
	role: state.auth.role,
});

export default connect(mapStateToProps)(ViewDashboard);
