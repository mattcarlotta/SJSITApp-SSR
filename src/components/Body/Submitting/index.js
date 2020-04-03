import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Submitting = ({ className, style }) => (
	<div className={className} style={style}>
		<div className="bar1" />
		<div className="bar2" />
		<div className="bar3" />
	</div>
);

Submitting.propTypes = {
	className: PropTypes.string.isRequired,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
};

export default styled(Submitting)`
	display: flex;
	justify-content: center;
	align-items: center;
	height: 54px;
	-webkit-animation: fadeIn 1s 0s ease-in-out forwards;
	animation: fadeIn 1s 0s ease-in-out forwards;

	& > div {
		width: 10px;
		margin-right: 5px;
		animation: pop 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
	}

	& .bar1 {
		background-color: #0798af;
		-webkit-animation-delay: -0.24s;
		animation-delay: -0.24s;
	}

	& .bar2 {
		background-color: #f2d40d;
		-webkit-animation-delay: -0.12s;
		animation-delay: -0.12s;
	}

	& .bar3 {
		background-color: #f58311;
		-webkit-animation-delay: 0s;
		animation-delay: 0s;
	}
`;
