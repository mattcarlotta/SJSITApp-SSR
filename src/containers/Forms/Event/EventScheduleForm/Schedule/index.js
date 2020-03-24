import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { DragDropContext } from "react-beautiful-dnd";
import Bold from "components/Body/Bold";
import DropContainer from "components/Body/DropContainer";
import FormatDate from "components/Body/FormatDate";
import Legend from "components/Body/Legend";
import List from "components/Body/List";
import ListItem from "components/Body/ListItem";
import Row from "components/Body/Row";
import ScheduleContainer from "components/Body/ScheduleContainer";
import Container from "./Container";
import GameDetailsContainer from "./GameDetailsContainer";

const Schedule = ({ handleDrag, event, columns, users }) => (
	<ScheduleContainer>
		<DragDropContext onDragEnd={handleDrag}>
			<Container>
				<Legend />
				<GameDetailsContainer>
					<div css="text-align: center;color: #fff;background: #025f6d;border-radius: 3px;padding: 10px 5px;text-transform: uppercase;font-size: 17px;">
						{event.team}{" "}
						{event.opponent && (
							<Fragment>
								<span
									css={`
										margin: 0 5px;
									`}
								>
									vs.{" "}
								</span>
								{event.opponent}
								&nbsp;
							</Fragment>
						)}
					</div>
					<List style={{ padding: "0 5px", fontSize: 17 }}>
						<ListItem>
							<Bold>Event Date: </Bold>{" "}
							<FormatDate
								style={{ display: "inline" }}
								date={event.eventDate}
								format="MMMM Do @ h:mm a"
							/>
						</ListItem>
						<ListItem>
							<Bold>Location: </Bold> {event.location}
						</ListItem>
						<ListItem>
							<Bold>Uniform: </Bold> {event.uniform}
						</ListItem>
						<ListItem>
							<Bold>Notes: </Bold> {event.notes || "(none)"}
						</ListItem>
					</List>
				</GameDetailsContainer>
			</Container>
			<Row>
				{columns.map(({ _id, title, employeeIds }) => (
					<DropContainer
						id={_id}
						key={_id}
						title={title}
						users={employeeIds.map(id => users.find(user => user._id === id))}
						width={`${100 / columns.length - 1}%`}
					/>
				))}
			</Row>
		</DragDropContext>
	</ScheduleContainer>
);

Schedule.propTypes = {
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			title: PropTypes.string.isRequired,
			employeeIds: PropTypes.arrayOf(PropTypes.string),
		}),
	),
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
	handleDrag: PropTypes.func.isRequired,
	users: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string.isRequired,
			firstName: PropTypes.string.isRequired,
			lastName: PropTypes.string.isRequired,
			response: PropTypes.string.isRequired,
			notes: PropTypes.string,
		}),
	),
};

export default Schedule;
