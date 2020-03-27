import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import isEmpty from "lodash.isempty";
import get from "lodash.get";
import moment from "moment-timezone";
import { Card, Col, Select } from "antd";
import { MdEvent } from "react-icons/md";
import CalendarContainer from "~components/Body/CalendarContainer";
import LoadingPanel from "~components/Body/LoadingPanel";
import ScheduleModal from "~components/Body/ScheduleModal";
import ScheduleList from "~components/Body/ScheduleList";
import Flex from "~components/Body/Flex";
import FlexEnd from "~components/Body/FlexEnd";
import FlexStart from "~components/Body/FlexStart";
import { fetchEvents } from "~actions/Dashboard";
import CalendarDate from "./CalendarDate";
import NoEvents from "./NoEvents";
import columns from "../Columns";

const Option = Select.Option;

const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 24,
};

export class Events extends Component {
	state = {
		selectedEvent: "Today",
		isVisible: false,
		modalChildren: null,
	};

	handleSelection = selectedEvent => {
		this.setState({ selectedEvent }, () =>
			this.props.fetchEvents(selectedEvent),
		);
	};

	handleCloseModal = () => {
		this.setState({
			isVisible: false,
			modalChildren: null,
		});
	};

	handleShowModal = modalChildren => {
		this.setState({
			isVisible: true,
			modalChildren: [modalChildren],
		});
	};

	render = () => {
		const { selectedEvent } = this.state;
		const { events, isLoading, role } = this.props;
		const eventDate = get(events[0], ["eventDate"]);
		const endOfDay = moment(eventDate).endOf("day");
		const selectedToday = selectedEvent === "Today";

		return (
			<>
				<Col {...columns}>
					<Card
						bodyStyle={{ minHeight: "300px" }}
						title={
							<>
								<MdEvent style={iconStyle} />
								<span css="vertical-align: middle;">Events</span>
							</>
						}
						extra={
							role === "employee" && (
								<Select
									size="large"
									onChange={this.handleSelection}
									defaultValue={selectedEvent}
									value={selectedEvent}
									style={{ width: 120 }}
								>
									{["Today", "Upcoming"].map(game => (
										<Option key={game} value={game}>
											{game}
										</Option>
									))}
								</Select>
							)
						}
					>
						<CalendarContainer>
							<Flex>
								<FlexStart>
									<CalendarDate style={{ textAlign: "left" }}>
										{moment(eventDate).format("dddd")}
									</CalendarDate>
								</FlexStart>
								<FlexEnd>
									<CalendarDate>
										{moment(eventDate).format("MMM DD")}
									</CalendarDate>
								</FlexEnd>
							</Flex>
							{isLoading ? (
								<LoadingPanel
									style={{
										margin: "30px auto 0",
										maxWidth: "350px",
										width: "100%",
										borderRadius: 3,
									}}
									height="140px"
								/>
							) : (
								<div css="padding: 30px 20px;">
									{!isEmpty(events) ? (
										events.map(props =>
											moment(props.eventDate) < endOfDay ? (
												<ScheduleList
													key={props._id}
													content={[props]}
													innerStyle={{
														padding: "5px 0",
														maxWidth: 225,
														margin: "0 auto",
													}}
													btnStyle={{ maxWidth: 585, minWidth: 225 }}
													spacing={20}
													padding="0"
													folder="lowres"
													handleShowModal={this.handleShowModal}
													loggedinUserId={this.props.loggedinUserId}
													scheduleIconStyle={{
														fontSize: 19,
														margin: "0 10px",
													}}
												/>
											) : null,
										)
									) : (
										<NoEvents selectedToday={selectedToday} />
									)}
								</div>
							)}
						</CalendarContainer>
					</Card>
				</Col>
				<ScheduleModal
					{...this.state}
					loggedinUserId={this.props.loggedinUserId}
					handleCloseModal={this.handleCloseModal}
				/>
			</>
		);
	};
}

Events.propTypes = {
	events: PropTypes.arrayOf(
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
	isLoading: PropTypes.bool.isRequired,
	fetchEvents: PropTypes.func.isRequired,
	loggedinUserId: PropTypes.string.isRequired,
	role: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
	events: state.dashboard.events.data,
	isLoading: state.dashboard.events.isLoading,
	loggedinUserId: state.auth.id,
	role: state.auth.role,
});

const mapDispatchToProps = {
	fetchEvents,
};

export default connect(mapStateToProps, mapDispatchToProps)(Events);
