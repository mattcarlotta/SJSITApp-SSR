import React, { Fragment } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import { FaCalendarCheck, FaClock } from "react-icons/fa";
import Badge from "components/Body/Badge";
import Bold from "components/Body/Bold";
import FormatDate from "components/Body/FormatDate";
import List from "components/Body/List";
import ListItem from "components/Body/ListItem";
import Modal from "components/Body/Modal";

const listStyle = {
	padding: "0 10px",
};

const ScheduleModal = ({
	id,
	handleCloseModal,
	isVisible,
	loggedinUserId,
	modalChildren,
}) =>
	isVisible ? (
		<Modal maxWidth="600px" onClick={handleCloseModal}>
			{modalChildren.map(
				({
					employeeNotes,
					employeeResponse,
					eventDate,
					eventType,
					location,
					notes,
					team,
					opponent,
					schedule,
					uniform,
				}) => (
					<List
						key="modal-content"
						style={{
							backgroundColor: "#ebebeb",
							borderRadius: "3px",
							marginTop: 10,
							WebkitBoxShadow: "0px 1px 6px 1px rgba(0,0,0,0.25)",
							MoxBoxShadow: "0px 1px 6px 1px rgba(0,0,0,0.25)",
							boxShadow: "0px 1px 6px 1px rgba(0,0,0,0.25)",
						}}
					>
						<ListItem
							className="team"
							style={{
								backgroundColor:
									team === "San Jose Sharks" ? "#025f6d" : "#f56342",
								marginTop: 0,
								color: "#fff",
								textAlign: "center",
								padding: "15px 10px",
							}}
						>
							<Bold>
								{team}
								{opponent && (
									<Fragment>
										<span css="margin: 0 5px;word-wrap: break-word;">vs.</span>
										{opponent}
									</Fragment>
								)}
							</Bold>
						</ListItem>
						<ListItem style={listStyle}>
							<Bold>Event Type: </Bold> {eventType}
						</ListItem>
						<ListItem style={listStyle}>
							<Bold>Date: </Bold>{" "}
							{moment(eventDate).format("MMMM Do, YYYY @ h:mm a")}
						</ListItem>
						{notes && (
							<ListItem style={listStyle}>
								<Bold>Event Notes: </Bold> {notes}
							</ListItem>
						)}
						<ListItem style={listStyle}>
							<Bold>Location: </Bold> {location}
						</ListItem>
						{uniform && (
							<ListItem style={listStyle}>
								<Bold>Uniform: </Bold> {uniform}
							</ListItem>
						)}
						{employeeResponse && (
							<ListItem style={listStyle}>
								<Bold>Employee Response:</Bold>
								<Badge
									style={{ display: "inline-block" }}
									response={employeeResponse}
								>
									{employeeResponse}
								</Badge>
							</ListItem>
						)}
						{employeeNotes && (
							<ListItem style={listStyle}>
								<Bold>Employee Notes:</Bold> {employeeNotes}
							</ListItem>
						)}
						{!isEmpty(schedule) && (
							<ListItem style={listStyle}>
								<Bold>Scheduled Employees</Bold>
								{schedule.map(({ _id, employeeIds }) => (
									<List style={{ marginTop: 5 }} key={_id}>
										<Bold style={{ paddingLeft: 10 }}>
											<FaClock
												style={{
													marginRight: 7,
													fontSize: 14,
													position: "relative",
													top: 1,
												}}
											/>
											<FormatDate
												style={{ display: "inline" }}
												format="hh:mm a"
												date={_id}
											/>
										</Bold>
										{!isEmpty(employeeIds) ? (
											employeeIds.map(({ _id, firstName, lastName }) => (
												<ListItem
													className="employee"
													style={{
														marginLeft: 15,
														paddingLeft: 10,
														backgroundColor:
															_id === id || _id === loggedinUserId
																? "#006d75"
																: "",
														color:
															_id === id || _id === loggedinUserId
																? "#fff"
																: "rgba(0,0,0,0.65)",
														fontWeight:
															_id === id || _id === loggedinUserId
																? "bold"
																: "normal",
													}}
													key={_id}
												>
													<span css="margin-right: 5px;">&#9900;</span>
													{(_id === id || _id === loggedinUserId) && (
														<span css="margin-right: 5px;">
															<FaCalendarCheck
																style={{
																	fontSize: 14,
																}}
															/>
														</span>
													)}
													<span>
														{firstName} {lastName}
													</span>
												</ListItem>
											))
										) : (
											<ListItem
												className="none-scheduled"
												style={{ marginLeft: 20, paddingLeft: 10 }}
											>
												<span css="margin-right: 5px;">&#9900;</span>
												&#40;none&#41;
											</ListItem>
										)}
									</List>
								))}
							</ListItem>
						)}
					</List>
				),
			)}
		</Modal>
	) : null;

ScheduleModal.propTypes = {
	id: PropTypes.string,
	handleCloseModal: PropTypes.func.isRequired,
	isVisible: PropTypes.bool.isRequired,
	loggedinUserId: PropTypes.string,
	modalChildren: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			eventDate: PropTypes.string,
			eventNotes: PropTypes.string,
			eventType: PropTypes.string,
			employeeResponse: PropTypes.string,
			employeeNotes: PropTypes.string,
			notes: PropTypes.string,
			opponent: PropTypes.string,
			response: PropTypes.string,
			team: PropTypes.string,
			schedule: PropTypes.arrayOf(
				PropTypes.shape({
					_id: PropTypes.string,
					employeeIds: PropTypes.arrayOf(
						PropTypes.shape({
							_id: PropTypes.string,
							firstName: PropTypes.string,
							lastName: PropTypes.string,
						}),
					),
				}),
			),
			uniform: PropTypes.string,
		}),
	),
};

export default ScheduleModal;
