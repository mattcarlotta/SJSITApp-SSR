import React, { Fragment, Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import debounce from "lodash.debounce";
import { connect } from "react-redux";
import { Card, Tabs } from "antd";
import { FaCogs, FaUserCircle, FaChartBar, FaReply } from "react-icons/fa";
import Head from "~components/Navigation/Head";
import ResponseCalendar from "~components/Body/ResponseCalendar";
import Line from "~components/Body/Line";
import LoadingPanel from "~components/Body/LoadingPanel";
import MemberAvailability from "~components/Body/MemberAvailability";
import PaneBody from "~components/Body/PaneBody";
import Title from "~components/Body/Title";
import {
	fetchMemberSettingsAvailability,
	fetchMemberSettingsEvents,
	updateMemberStatus,
} from "~actions/Members";
import Profile from "./Profile";

const Pane = Tabs.TabPane;

const title = "Settings";
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

export class Settings extends Component {
	state = {
		windowWidth: 0,
	};

	componentDidMount = () => {
		this.setState({ windowWidth: window.innerWidth });
		window.addEventListener("resize", this.handleResize);
	};

	componentWillUnmount() {
		window.removeEventListener("resize", this.handleResize);
	}

	/* istanbul ignore next */
	handleResize = debounce(
		() =>
			this.setState({
				windowWidth: window.innerWidth,
			}),
		100,
	);

	render = () => {
		const { windowWidth } = this.state;
		const {
			eventResponses,
			fetchMemberSettingsAvailability,
			viewMember,
		} = this.props;

		const { _id, role } = viewMember;
		const isStaff = role !== "employee";

		return (
			<Fragment>
				<Head title={title} />
				<Card
					style={{ minHeight: 800 }}
					title={
						<Fragment>
							<FaCogs style={iconStyle} />
							<span css="vertical-align: middle;">{title}</span>
						</Fragment>
					}
				>
					{isEmpty(viewMember) ? (
						<LoadingPanel height="685px" />
					) : (
						<Tabs tabPosition={windowWidth <= 900 ? "top" : "left"}>
							<Pane tab={profile} key="profile">
								<Profile {...this.props.viewMember} />
							</Pane>
							<Pane tab={availability} disabled={isStaff} key="availability">
								<PaneBody>
									<Title centered>My Availability</Title>
									<Line centered width="400px" />
									<MemberAvailability
										{...this.props}
										id={_id}
										fetchAction={fetchMemberSettingsAvailability}
									/>
								</PaneBody>
							</Pane>
							<Pane tab={responses} disabled={isStaff} key="responses">
								<PaneBody>
									<Title centered>My Event Responses</Title>
									<Line centered width="400px" />
									<ResponseCalendar
										{...this.props}
										id={_id}
										scheduleEvents={eventResponses}
									/>
								</PaneBody>
							</Pane>
						</Tabs>
					)}
				</Card>
			</Fragment>
		);
	};
}

Settings.propTypes = {
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
	fetchMemberSettingsAvailability: PropTypes.func.isRequired,
	fetchMemberSettingsEvents: PropTypes.func.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		}),
	}),
	memberAvailability: PropTypes.shape({
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
};

const mapStateToProps = ({ members, server }) => ({
	eventResponses: members.eventResponses,
	memberAvailability: members.memberAvailability,
	viewMember: members.viewMember,
	serverMessage: server.message,
});

const mapDispatchToProps = {
	fetchMemberSettingsAvailability,
	fetchMemberSettingsEvents,
	updateMemberStatus,
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
