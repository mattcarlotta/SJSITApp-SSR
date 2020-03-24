import React from "react";
import PropTypes from "prop-types";
import { Tooltip } from "antd";
import { FaStopwatch, FaShareSquare, FaTimes } from "react-icons/fa";

const iconStyle = {
	fontSize: 22,
	position: "relative",
	top: "2px",
};

const displayEmailStatus = status => {
	switch (status) {
		case "sent": {
			return <FaShareSquare style={{ ...iconStyle, color: "#008000" }} />;
		}
		case "unsent": {
			return <FaStopwatch style={{ ...iconStyle, color: "#ffa000" }} />;
		}
		default: {
			return <FaTimes style={{ ...iconStyle, color: "red" }} />;
		}
	}
};

const EmailStatus = ({ status }) => (
	<Tooltip title={status} placement="top">
		{displayEmailStatus(status)}
	</Tooltip>
);

EmailStatus.propTypes = {
	status: PropTypes.string.isRequired,
};

export default EmailStatus;
