import React from "react";
import PropTypes from "prop-types";
import { Tooltip } from "antd";
import { FaUser, FaUserTimes } from "react-icons/fa";

const activeUserStyle = { color: "green", position: "relative", top: "2px" };
const inactiveUserStyle = {
	fontSize: 22,
	position: "relative",
	top: 5,
	left: 3,
	color: "red",
};

const DisplayStatus = ({ status }) => (
	<Tooltip title={status} placement="top">
		{status === "active" ? (
			<FaUser style={activeUserStyle} />
		) : (
			<FaUserTimes style={inactiveUserStyle} />
		)}
	</Tooltip>
);

DisplayStatus.propTypes = {
	status: PropTypes.string.isRequired,
};

export default DisplayStatus;
