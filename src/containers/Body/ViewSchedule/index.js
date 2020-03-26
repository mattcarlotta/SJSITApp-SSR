import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { FaCalendar } from "react-icons/fa";
import { Card } from "antd";
import Head from "~components/Navigation/Head";
import Calendar from "~components/Body/Calendar";
import { fetchScheduleEvents } from "~actions/Events";

const title = "Schedule";
const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 20,
};

export const ViewSchedule = ({ fetchScheduleEvents, ...rest }) => (
	<Fragment>
		<Head title={title} />
		<Card
			title={
				<Fragment>
					<FaCalendar style={iconStyle} />
					<span css="vertical-align: middle;">{title}</span>
				</Fragment>
			}
		>
			<Calendar {...rest} fetchAction={fetchScheduleEvents} />
		</Card>
	</Fragment>
);

ViewSchedule.propTypes = {
	fetchScheduleEvents: PropTypes.func.isRequired,
	loggedinUserId: PropTypes.string.isRequired,
	role: PropTypes.string.isRequired,
	scheduleEvents: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			eventDate: PropTypes.string,
			eventNotes: PropTypes.string,
			eventType: PropTypes.string,
			notes: PropTypes.string,
			opponent: PropTypes.string,
			response: PropTypes.string,
			team: PropTypes.string,
			schedule: PropTypes.arrayOf(
				PropTypes.shape({
					_id: PropTypes.string,
					title: PropTypes.string,
					employeeIds: PropTypes.arrayOf(
						PropTypes.shape({
							_id: PropTypes.string,
							firstName: PropTypes.string,
							lastName: PropTypes.string,
						}),
					),
				}),
			),
		}),
	),
};

/* istanbul ignore next */
const mapStateToProps = ({ auth, events }) => ({
	loggedinUserId: auth.id,
	scheduleEvents: events.scheduleEvents,
	role: auth.role,
});

/* istanbul ignore next */
const mapDispatchToProps = {
	fetchScheduleEvents,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewSchedule);
