import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Badge from "~components/Body/Badge";
import ColumnTitle from "~components/Body/ColumnTitle";

const Legend = ({ className, style }) => (
	<div className={className} style={style}>
		<ColumnTitle
			style={{
				marginBottom: 5,
				background:
					"linear-gradient(90deg,#194048 0%,#0f7888 50%,#194048 100%)",
				textShadow: "1px 2px 2px #000000",
			}}
		>
			Legend
		</ColumnTitle>
		{[
			"I want to work.",
			"Available to work.",
			"Prefer not to work.",
			"Not available to work.",
			"No response.",
		].map(response => (
			<Badge key={response} response={response} style={{ fontSize: 17 }}>
				{response}
			</Badge>
		))}
	</div>
);

Legend.propTypes = {
	className: PropTypes.string.isRequired,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
};

export default styled(Legend)`
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
