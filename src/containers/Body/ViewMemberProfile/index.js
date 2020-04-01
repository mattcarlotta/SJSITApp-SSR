import React from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import Router from "next/router";
import { connect } from "react-redux";
import { Card, Tabs } from "antd";
import {
	FaUserCircle,
	FaChartBar,
	FaReply,
	FaClock,
	FaUserEdit,
} from "react-icons/fa";
import { resetServerMessage } from "~actions/Messages";
import {
	fetchMember,
	fetchMemberAvailability,
	fetchMemberEvents,
	updateMemberStatus,
} from "~actions/Members";
import { fetchScheduleEvents } from "~actions/Events";
import Head from "~components/Navigation/Head";
import BackButton from "~components/Body/BackButton";
import Calendar from "~components/Body/Calendar";
import FadeIn from "~components/Body/FadeIn";
import Line from "~components/Body/Line";
import LoadingPanel from "~components/Body/LoadingPanel";
import MemberAvailability from "~components/Body/MemberAvailability";
import PaneBody from "~components/Body/PaneBody";
import Title from "~components/Body/Title";
import Profile from "./Profile";

const Pane = Tabs.TabPane;

const title = "Member Profile";
const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 20,
};

const profile = (
	<span>
		<span className="anticon">
			<FaUserCircle />
		</span>
		Profile
	</span>
);

const availability = (
	<span>
		<span className="anticon">
			<FaChartBar />
		</span>
		Availability
	</span>
);

const responses = (
	<span>
		<span className="anticon">
			<FaReply />
		</span>
		Responses
	</span>
);

const scheduling = (
	<span>
		<span className="anticon">
			<FaClock />
		</span>
		Schedule
	</span>
);

export const ViewMemberProfile = props => {
	const {
		eventResponses,
		fetchMemberAvailability,
		fetchMemberEvents,
		fetchScheduleEvents,
		viewMember,
	} = props;

	const { _id: id, firstName, lastName } = viewMember;

	return (
		<>
			<Head title={title} />
			<Card
				style={{ minHeight: 800 }}
				extra={<BackButton push={Router.back} />}
				title={
					<>
						<FaUserEdit style={iconStyle} />
						<span css="vertical-align: middle;">{title}</span>
					</>
				}
			>
				{isEmpty(viewMember) ? (
					<LoadingPanel height="685px" />
				) : (
					<FadeIn timing="0.6s">
						<Tabs tabPosition="left">
							<Pane tab={profile} key="profile">
								<Profile {...props} />
							</Pane>
							<Pane tab={availability} key="availability">
								<PaneBody>
									<Title centered>
										{firstName} {lastName}&#39;s Availability
									</Title>
									<Line centered width="400px" />
									<MemberAvailability
										{...props}
										id={id}
										fetchAction={fetchMemberAvailability}
									/>
								</PaneBody>
							</Pane>
							<Pane tab={responses} key="responses">
								<PaneBody>
									<Title centered>
										{firstName} {lastName}&#39;s Responses
									</Title>
									<Line centered width="400px" />
									<Calendar
										{...props}
										id={id}
										scheduleEvents={eventResponses}
										fetchAction={fetchMemberEvents}
										fetchInitialData={() => fetchMemberEvents({ id })}
									/>
								</PaneBody>
							</Pane>
							<Pane tab={scheduling} key="schedule">
								<PaneBody>
									<Title centered>
										{firstName} {lastName}&#39;s Schedule
									</Title>
									<Line centered width="400px" />
									<Calendar
										{...props}
										id={id}
										loggedinUser={id}
										fetchAction={fetchScheduleEvents}
										fetchInitialData={() =>
											fetchScheduleEvents({ id, selectedGames: "My Games" })
										}
										title="View Member Schedule"
									/>
								</PaneBody>
							</Pane>
						</Tabs>
					</FadeIn>
				)}
			</Card>
		</>
	);
};

ViewMemberProfile.propTypes = {
	eventResponses: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			eventDate: PropTypes.string,
			eventNotes: PropTypes.string,
			eventType: PropTypes.string,
			employeeResponse: PropTypes.string,
			employeeNotes: PropTypes.string,
			location: PropTypes.string,
			opponent: PropTypes.string,
			team: PropTypes.string,
		}),
	),
	fetchMember: PropTypes.func.isRequired,
	fetchMemberAvailability: PropTypes.func.isRequired,
	fetchMemberEvents: PropTypes.func.isRequired,
	fetchScheduleEvents: PropTypes.func.isRequired,
	resetServerMessage: PropTypes.func.isRequired,
	memberAvailability: PropTypes.shape({
		eventAvailability: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string,
				label: PropTypes.string,
				value: PropTypes.number,
			}),
		),
		memberScheduleEvents: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string,
				events: PropTypes.number,
			}),
		),
		memberResponseCount: PropTypes.arrayOf(
			PropTypes.shape({
				id: PropTypes.string,
				color: PropTypes.string,
				label: PropTypes.string,
				value: PropTypes.number,
			}),
		),
	}),
	viewMember: PropTypes.shape({
		_id: PropTypes.string,
		email: PropTypes.string,
		emailReminders: PropTypes.bool,
		firstName: PropTypes.string,
		lastName: PropTypes.string,
		registered: PropTypes.string,
		role: PropTypes.string,
		schedule: PropTypes.any,
		status: PropTypes.string,
	}),
	updateMemberStatus: PropTypes.func.isRequired,
	serverMessage: PropTypes.string,
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

const mapStateToProps = ({ events, members, server }) => ({
	eventResponses: members.eventResponses,
	memberAvailability: members.memberAvailability,
	viewMember: members.viewMember,
	scheduleEvents: events.scheduleEvents,
	serverMessage: server.message,
});

const mapDispatchToProps = {
	fetchMember,
	fetchMemberAvailability,
	fetchMemberEvents,
	fetchScheduleEvents,
	resetServerMessage,
	updateMemberStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewMemberProfile);
