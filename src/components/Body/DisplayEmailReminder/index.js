import React from "react";
import PropTypes from "prop-types";
import { Tooltip } from "antd";
import { FaStopwatch, FaShareSquare } from "react-icons/fa";

const iconStyle = {
	fontSize: 22,
	position: "relative",
	top: "2px",
};

const DisplayReminder = ({ reminder }) => {
	const reminderStatus = reminder ? "sent" : "unsent";
	return (
		<Tooltip title={reminderStatus} placement="top">
			<span data-test={reminderStatus}>
				{reminder ? (
					<FaShareSquare style={{ ...iconStyle, color: "#008000" }} />
				) : (
					<FaStopwatch style={{ ...iconStyle, color: "#ffa000" }} />
				)}
			</span>
		</Tooltip>
	);
};

DisplayReminder.propTypes = {
	reminder: PropTypes.bool,
};

export default DisplayReminder;
