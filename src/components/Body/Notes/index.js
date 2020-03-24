import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Notes = ({ className, notes, style }) => (
	<div className={className} style={style}>
		<i style={{ marginRight: 5 }}>Special Notes: </i>
		<span>{notes}</span>
	</div>
);

Notes.propTypes = {
	className: PropTypes.string.isRequired,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
	notes: PropTypes.string,
};

export default styled(Notes)`
	font-size: 16px;
	margin-top: 20px;
`;
