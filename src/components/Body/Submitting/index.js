import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Submitting = ({ className }) => (
	<div className={className}>
		<div className="bar1" />
		<div className="bar2" />
		<div className="bar3" />
	</div>
);

Submitting.propTypes = {
	className: PropTypes.string.isRequired,
};

export default styled(Submitting)`
	position: relative;
	width: 54px;
	height: 54px;
	margin: 0 auto;
	-webkit-animation: fadeIn 1s 0s ease-in-out forwards;
	animation: fadeIn 1s 0s ease-in-out forwards;

	& > div {
		display: inline-block;
		position: absolute;
		width: 10px;
		animation: pop 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
	}

	& .bar1 {
		background-color: #0798af;
		left: 6px;
		-webkit-animation-delay: -0.24s;
		animation-delay: -0.24s;
	}

	& .bar2 {
		background-color: #f2d40d;
		left: 22px;
		-webkit-animation-delay: -0.12s;
		animation-delay: -0.12s;
	}

	& .bar3 {
		background-color: #f58311;
		left: 38px;
		-webkit-animation-delay: 0s;
		animation-delay: 0s;
	}
`;
