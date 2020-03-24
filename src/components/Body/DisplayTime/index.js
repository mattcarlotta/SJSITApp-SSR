import React from "react";
import PropTypes from "prop-types";
import moment from "moment-timezone";
import isEmpty from "lodash/isEmpty";

const DisplayTime = ({ times }) =>
	!isEmpty(times) ? (
		times.map(time => (
			<div
				key={time}
				css="word-wrap: break-word;word-break: break-all; min-width: 75px;"
			>
				{moment(time).format("h:mm a")}
			</div>
		))
	) : (
		<span>-</span>
	);

DisplayTime.propTypes = {
	times: PropTypes.arrayOf(PropTypes.string),
};

export default DisplayTime;
