import React from "react";
import PropTypes from "prop-types";
import { Tooltip } from "antd";
import { FaShareSquare, FaTimes } from "react-icons/fa";

const iconStyle = {
	fontSize: 22,
	position: "relative",
	top: "2px",
};

const EmailReminders = ({ status }) => (
	<Tooltip title={status ? "active" : "inactive"} placement="top">
		{status ? (
			<FaShareSquare style={{ ...iconStyle, color: "#008000" }} />
		) : (
			<FaTimes style={{ ...iconStyle, color: "red" }} />
		)}
	</Tooltip>
);

EmailReminders.propTypes = {
	status: PropTypes.bool.isRequired,
};

export default EmailReminders;
