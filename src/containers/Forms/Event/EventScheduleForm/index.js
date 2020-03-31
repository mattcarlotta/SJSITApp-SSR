import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import { Card } from "antd";
import { connect } from "react-redux";
import Router from "next/router";
import { FaClipboardCheck, FaChartBar } from "react-icons/fa";
import Button from "~components/Body/Button";
import BackButton from "~components/Body/BackButton";
import Center from "~components/Body/Center";
import MemberEventCountChart from "~components/Body/MemberEventCountChart";
import Modal from "~components/Body/Modal";
import SubmitButton from "~components/Body/SubmitButton";
import FormTitle from "~components/Forms/FormTitle";
import LoadingScheduleForm from "~components/Forms/LoadingScheduleForm";
import { updateEventSchedule } from "~actions/Events";
import Schedule from "./Schedule";

const title = "Event Scheduling";
const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 20,
};

export class EventScheduleForm extends Component {
	state = {
		event: {},
		users: [],
		columns: [],
		isLoading: true,
		isSubmitting: false,
		isVisible: false,
	};

	static getDerivedStateFromProps = ({ schedule, serverMessage }, state) => {
		if (state.isLoading && !isEmpty(schedule))
			return { ...schedule, isLoading: false };

		if (serverMessage) return { isSubmitting: false };

		return null;
	};

	onDragEnd = ({ source, destination, draggableId }) => {
		// dropped inside of the list
		if (source && destination) {
			this.setState(prevState => {
				// source container index and id
				const { index: sourceIndex, droppableId: sourceId } = source;

				// destination container index and id
				const {
					index: destinationIndex,
					droppableId: destinationId,
				} = destination;

				// source container object
				const sourceContainer = prevState.columns.find(
					column => column._id === sourceId,
				);

				// desination container object
				const destinationContainer = prevState.columns.find(
					column => column._id === destinationId,
				);

				// source container "employeeIds" array
				const sourceIds = Array.from(sourceContainer.employeeIds);

				// destination container "employeeIds" array
				const destinationIds = Array.from(destinationContainer.employeeIds);

				// check if source and destination container are the same
				const isSameContainer =
					sourceContainer._id === destinationContainer._id;

				//  remove a userId from the source "employeeIds" array via the sourceIndex
				sourceIds.splice(sourceIndex, 1);

				// add a userId (draggableId) to the source or destination "employeeIds" array
				if (isSameContainer) {
					sourceIds.splice(destinationIndex, 0, draggableId);
				} else {
					destinationIds.splice(destinationIndex, 0, draggableId);
				}

				// update the source container with changed sourceIds
				const newSourceContainer = {
					...sourceContainer,
					employeeIds: sourceIds,
				};

				// update the destination container with changed destinationIds
				const newDestinationContainer = {
					...destinationContainer,
					employeeIds: destinationIds,
				};

				// loop through current columns and update the source
				// and destination containers
				const columns = prevState.columns.map(column => {
					if (column._id === newSourceContainer._id) {
						return newSourceContainer;
					}

					if (column._id === newDestinationContainer._id && !isSameContainer) {
						return newDestinationContainer;
					}

					return column;
				});

				return {
					...prevState,
					columns,
				};
			});
		}
	};

	handleToggleModal = () =>
		this.setState(prevState => ({ isVisible: !prevState.isVisible }));

	handleSubmit = e => {
		e.preventDefault();
		const { event, columns } = this.state;
		const { updateEventSchedule } = this.props;
		const schedule = columns.filter(column => column._id !== "employees");

		this.setState({ isSubmitting: true }, () =>
			updateEventSchedule({ _id: event._id, schedule }),
		);
	};

	render = () => (
		<Card
			extra={<BackButton push={Router.back} />}
			title={
				<>
					<FaClipboardCheck style={iconStyle} />
					<span css="vertical-align: middle;">{title}</span>
				</>
			}
		>
			<Center>
				<FormTitle
					header={title}
					title={title}
					description="Drag and drop from the employee pool to any of the call times."
				/>
			</Center>
			<form onSubmit={this.handleSubmit}>
				{this.state.isLoading ? (
					<LoadingScheduleForm />
				) : (
					<>
						<Button
							id="event-distribution"
							primary
							padding="8px"
							width="335px"
							style={{ margin: "0 auto" }}
							onClick={this.handleToggleModal}
						>
							<FaChartBar
								style={{ position: "relative", top: 4, marginRight: 5 }}
							/>{" "}
							Monthly Event Distribution
						</Button>
						<Schedule {...this.state} handleDrag={this.onDragEnd} />
						<SubmitButton
							disabled={this.state.isLoading}
							title="Submit Schedule"
							style={{ maxWidth: 300, margin: "0 auto" }}
							isSubmitting={this.state.isSubmitting}
						/>
					</>
				)}
			</form>
			{this.state.isVisible && (
				<Modal maxWidth="100%" onClick={this.handleToggleModal}>
					<MemberEventCountChart
						height="600px"
						style={{ marginTop: 20 }}
						{...this.props}
					/>
				</Modal>
			)}
		</Card>
	);
}

/*

				*/

EventScheduleForm.propTypes = {
	members: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			"Event Count": PropTypes.number,
		}),
	),
	schedule: PropTypes.shape({
		event: PropTypes.shape({
			_id: PropTypes.string,
			eventType: PropTypes.string,
			team: PropTypes.string,
			opponent: PropTypes.string,
			location: PropTypes.string,
			callTimes: PropTypes.arrayOf(PropTypes.string),
			uniform: PropTypes.string,
			seasonId: PropTypes.string,
			eventDate: PropTypes.string,
			notes: PropTypes.string,
			employeeResponses: PropTypes.arrayOf(
				PropTypes.shape({
					_id: PropTypes.string,
					response: PropTypes.string,
					notes: PropTypes.string,
				}),
			),
		}),
		users: PropTypes.arrayOf(
			PropTypes.shape({
				_id: PropTypes.string.isRequired,
				firstName: PropTypes.string.isRequired,
				lastName: PropTypes.string.isRequired,
				response: PropTypes.string.isRequired,
				notes: PropTypes.string,
			}),
		),
		columns: PropTypes.arrayOf(
			PropTypes.shape({
				_id: PropTypes.string.isRequired,
				title: PropTypes.string.isRequired,
				employeeIds: PropTypes.arrayOf(PropTypes.string),
			}),
		),
	}),
	serverMessage: PropTypes.string,
	updateEventSchedule: PropTypes.func.isRequired,
};

const mapStateToProps = ({ events, server }) => ({
	members: events.members,
	schedule: events.schedule,
	serverMessage: server.message,
});

const mapDispatchToProps = {
	updateEventSchedule,
};

export default connect(mapStateToProps, mapDispatchToProps)(EventScheduleForm);
