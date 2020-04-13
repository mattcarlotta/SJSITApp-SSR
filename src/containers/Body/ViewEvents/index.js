import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card } from "antd";
import { MdEventNote } from "react-icons/md";
import Head from "~components/Navigation/Head";
import Table from "~components/Body/Table";
import QueryHandler from "~components/Navigation/QueryHandler";
import {
	deleteEvent,
	deleteManyEvents,
	fetchEvents,
	resendMail,
} from "~actions/Events";
import Filters from "./Filters";
import columns from "./Columns";

const title = "Events";

export const ViewEvents = ({
	deleteEvent,
	deleteManyEvents,
	fetchEvents,
	resendMail,
	...rest
}) => (
	<>
		<Head title={title} />
		<Card
			title={
				<>
					<MdEventNote
						style={{
							verticalAlign: "middle",
							marginRight: 10,
							fontSize: 22,
						}}
					/>
					<span css="vertical-align: middle;">{title}</span>
				</>
			}
		>
			<QueryHandler>
				{props => (
					<>
						<Filters {...props} {...rest} />
						<Table
							{...props}
							{...rest}
							columns={columns}
							deleteAction={deleteEvent}
							deleteManyRecords={deleteManyEvents}
							fetchData={fetchEvents}
							editLocation="events"
							assignLocation="events"
							sendMail={resendMail}
						/>
					</>
				)}
			</QueryHandler>
		</Card>
	</>
);

ViewEvents.propTypes = {
	deleteEvent: PropTypes.func.isRequired,
	deleteManyEvents: PropTypes.func.isRequired,
	fetchEvents: PropTypes.func.isRequired,
	data: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			team: PropTypes.string,
			opponent: PropTypes.string,
			eventType: PropTypes.string,
			location: PropTypes.string,
			callTimes: PropTypes.arrayOf(PropTypes.string),
			seasonId: PropTypes.string,
			eventDate: PropTypes.string,
			employeeResponses: PropTypes.arrayOf(
				PropTypes.shape({
					_id: PropTypes.string,
					response: PropTypes.string,
					notes: PropTypes.string,
				}),
			),
			scheduledIds: PropTypes.arrayOf(
				PropTypes.shape({
					_id: PropTypes.string,
					firstName: PropTypes.string,
					lastName: PropTypes.string,
				}),
			),
			schedule: PropTypes.number,
			sentEmailReminders: PropTypes.bool,
		}),
	),
	isLoading: PropTypes.bool.isRequired,
	resendMail: PropTypes.func.isRequired,
	teams: PropTypes.arrayOf(PropTypes.string),
	totalDocs: PropTypes.number,
};

/* istanbul ignore next */
const mapStateToProps = ({ events, teams }) => ({
	data: events.data,
	isLoading: events.isLoading,
	totalDocs: events.totalDocs,
	teams: teams.data,
});

/* istanbul ignore next */
const mapDispatchToProps = {
	deleteEvent,
	deleteManyEvents,
	fetchEvents,
	resendMail,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewEvents);
