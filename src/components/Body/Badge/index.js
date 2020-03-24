import React from "react";
import PropTypes from "prop-types";
import { FaCircle } from "react-icons/fa";

const iconStyle = {
	margin: "0 5px",
	fontSize: 18,
	position: "relative",
	top: 2,
};

export const showBadge = response => {
	switch (response) {
		case "Scheduled Games":
		case "I want to work.": {
			return "#247BA0";
		}
		case "Available Games":
		case "Available to work.": {
			return "#2A9D8F";
		}
		case "Prefer not to work.": {
			return "#F4A261"; // 2A9D8F
		}
		case "Not available to work.": {
			return "#FF8060";
		}
		case "No response.": {
			return "#BFBFBF"; // F4A261
		}
		case "Scheduled.": {
			return "limegreen";
		}
		default: {
			return "transparent";
		}
	}
};

const Badge = ({ children, response, style }) => (
	<div style={{ ...style, margin: 0 }}>
		<FaCircle
			style={{
				...iconStyle,
				color: showBadge(response),
			}}
		/>
		<span style={{ position: "relative", top: "-2px" }}>{children}</span>
	</div>
);

Badge.propTypes = {
	children: PropTypes.oneOfType([PropTypes.string, PropTypes.node]),
	response: PropTypes.string,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
};

export default Badge;
