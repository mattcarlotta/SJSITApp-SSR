import React from "react";
import PropTypes from "prop-types";
import { FaChevronLeft } from "react-icons/fa";
import Button from "~components/Body/Button";

const iconStyle = {
	position: "relative",
	top: 3,
	fontSize: 15,
};

const textStyle = {
	fontSize: "16px",
	paddingLeft: 5,
};

const BackButton = ({ push, location, style, title }) => (
	<Button
		primary
		width="110px"
		padding="4px"
		style={{ ...style, lineHeight: 1.5 }}
		onClick={() => push(location)}
	>
		<FaChevronLeft style={iconStyle} />
		<span style={textStyle}>{title || "Go Back"}</span>
	</Button>
);

BackButton.propTypes = {
	push: PropTypes.func.isRequired,
	location: PropTypes.string,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
	title: PropTypes.string,
};

BackButton.defaultProps = {
	style: {},
};

export default BackButton;
