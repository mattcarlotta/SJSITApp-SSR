import React from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import { FaCalendarCheck } from "react-icons/fa";
import Button from "~components/Body/Button";
import DisplayTeam from "~components/Body/DisplayTeam";
import FadeIn from "~components/Body/FadeIn";
import FlexSpaceAround from "~components/Body/FlexSpaceAround";
import CalendarWeek from "~components/Body/CalendarWeek";

const iconStyle = {
	position: "relative",
	verticalAlign: "middle",
	color: "#fff",
	fontSize: 16,
	margin: "0 5px",
};

const initBtnStyle = {
	minWidth: 125,
	margin: "3px auto 0",
};

const ScheduleList = ({
	btnStyle,
	content,
	date,
	folder,
	handleShowModal,
	height,
	innerStyle,
	padding,
	loggedinUserId,
	scheduleIconStyle,
	spacing,
	width,
}) => (
	<>
		<CalendarWeek>{date}</CalendarWeek>
		{!isEmpty(content) &&
			content.map(item => (
				<FadeIn key={item._id} timing="0.4s">
					<Button
						dataTest="upcoming-event"
						className="event-date"
						primary={item.team === "San Jose Sharks"}
						danger={item.team === "San Jose Barracuda"}
						padding={padding}
						style={{ ...initBtnStyle, ...btnStyle }}
						onClick={() => handleShowModal(item)}
					>
						<FlexSpaceAround style={innerStyle}>
							{!isEmpty(item.schedule) &&
								item.schedule.map(({ employeeIds }) =>
									!isEmpty(employeeIds) &&
									employeeIds.some(({ _id }) => _id === loggedinUserId) ? (
										<FaCalendarCheck
											key={loggedinUserId}
											style={{ ...iconStyle, ...scheduleIconStyle }}
										/>
									) : null,
								)}
							<DisplayTeam
								folder={folder || "calendar"}
								height={height}
								width={width}
								size={height || width}
								team={item.team}
							/>
							{item.opponent && (
								<>
									<span
										css={`
											margin: 0 ${spacing || 5}px;
										`}
									>
										vs.
									</span>
									<DisplayTeam
										folder={folder || "calendar"}
										height={height}
										size={height || width}
										width={width}
										team={item.opponent}
									/>
								</>
							)}
						</FlexSpaceAround>
					</Button>
				</FadeIn>
			))}
	</>
);

ScheduleList.propTypes = {
	btnStyle: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
	content: PropTypes.arrayOf(
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
	date: PropTypes.string,
	folder: PropTypes.string,
	handleShowModal: PropTypes.func.isRequired,
	height: PropTypes.string,
	innerStyle: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
	loggedinUserId: PropTypes.string,
	padding: PropTypes.string,
	spacing: PropTypes.number,
	scheduleIconStyle: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
	width: PropTypes.string,
};

export default ScheduleList;
