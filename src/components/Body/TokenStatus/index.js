import React from "react";
import PropTypes from "prop-types";
import { Tooltip } from "antd";
import { FaUserCheck, FaUserClock } from "react-icons/fa";

const iconStyle = {
	fontSize: 22,
	position: "relative",
	top: "2px",
};

const activeUserStyle = { ...iconStyle, color: "#008000" };
const inactiveUserStyle = { ...iconStyle, color: "#FFA000" };

const TokenStatus = ({ email }) => {
	const isRegistered = email ? "Registered" : "Unregistered";
	return (
		<Tooltip title={isRegistered} placement="top">
			{email ? (
				<FaUserCheck style={activeUserStyle} />
			) : (
				<FaUserClock style={inactiveUserStyle} />
			)}
		</Tooltip>
	);
};

TokenStatus.propTypes = {
	email: PropTypes.string,
};

export default TokenStatus;
