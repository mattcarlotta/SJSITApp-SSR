import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
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
import { fetchTeamNames } from "~actions/Teams";
import Filters from "./Filters";
import columns from "./Columns";

const title = "Events";

export class ViewEvents extends PureComponent {
	componentDidMount = () => {
		if (isEmpty(this.props.teams)) this.props.fetchTeamNames();
	};

	render = () => {
		const {
			deleteEvent,
			deleteManyEvents,
			fetchEvents,
			resendMail,
			...rest
		} = this.props;

		return (
			<Fragment>
				<Head title={title} />
				<Card
					title={
						<Fragment>
							<MdEventNote
								style={{
									verticalAlign: "middle",
									marginRight: 10,
									fontSize: 22,
								}}
							/>
							<span css="vertical-align: middle;">{title}</span>
						</Fragment>
					}
				>
					<QueryHandler {...this.props}>
						{props => (
							<Fragment>
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
							</Fragment>
						)}
					</QueryHandler>
				</Card>
			</Fragment>
		);
	};
}

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
	fetchTeamNames: PropTypes.func.isRequired,
	location: PropTypes.shape({
		pathname: PropTypes.string,
		search: PropTypes.string,
	}),
	resendMail: PropTypes.func.isRequired,
	teams: PropTypes.arrayOf(PropTypes.string),
	totalDocs: PropTypes.number,
};

const mapStateToProps = state => ({
	data: state.events.data,
	isLoading: state.events.isLoading,
	totalDocs: state.events.totalDocs,
	teams: state.teams.data,
});

const mapDispatchToProps = {
	deleteEvent,
	deleteManyEvents,
	fetchEvents,
	fetchTeamNames,
	resendMail,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewEvents);
