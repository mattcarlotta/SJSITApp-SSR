import React from "react";
import PropTypes from "prop-types";
import moment from "moment-timezone";

const FormatDate = ({ date, format, style }) => (
	<p style={style}>{moment(date || Date.now()).format(format)}</p>
);

FormatDate.propTypes = {
	date: PropTypes.string.isRequired,
	format: PropTypes.string.isRequired,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
};

export default FormatDate;
