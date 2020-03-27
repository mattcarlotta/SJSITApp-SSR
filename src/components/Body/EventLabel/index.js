import React from "react";
import PropTypes from "prop-types";
import FormatDate from "~components/Body/FormatDate";
import DisplayTeam from "~components/Body/DisplayTeam";

const EventLabel = ({ eventType, eventDate, opponent, style, team }) => (
	<span style={style}>
		<div css="display: inline-block;margin-right: 10px;margin-top: 10px;">
			<DisplayTeam folder="lowres" team={team} />{" "}
			{opponent && (
				<>
					<span style={{ margin: "0 5px" }}>vs.</span>
					<DisplayTeam folder="lowres" team={opponent} />
					&nbsp;
				</>
			)}
			({eventType})
		</div>
		<div css="display: inline-block;margin-right: 10px;">&#8212;</div>
		<div css="display: inline-block;">
			<FormatDate
				style={{ display: "inline" }}
				format="ddd, MMMM Do @ h:mm a"
				date={eventDate}
			/>
		</div>
	</span>
);

EventLabel.propTypes = {
	eventDate: PropTypes.string,
	eventType: PropTypes.string,
	opponent: PropTypes.string,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
	team: PropTypes.string,
};

export default EventLabel;
