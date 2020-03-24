import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Badge from "~components/Body/Badge";
import ColumnTitle from "~components/Body/ColumnTitle";

const BarLegend = ({ className, style }) => (
	<div className={className} style={style}>
		<ColumnTitle style={{ marginBottom: 5 }}>Legend</ColumnTitle>
		{["Scheduled Games", "Available Games"].map(response => (
			<Badge key={response} response={response} style={{ fontSize: 17 }}>
				{response}
			</Badge>
		))}
	</div>
);

BarLegend.propTypes = {
	className: PropTypes.string.isRequired,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
};

export default styled(BarLegend)`
	@media (max-width: 1280px) {
		width: 98.5%;
	}
	width: 225px;
	padding: 10px;
	margin-left: 5px;
	margin-bottom: 10px;
	background: #ebecf0;
	border-radius: 3px;
`;
