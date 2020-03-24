import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Spinner = ({ className }) => (
	<div className={className}>
		<div className="bar1" />
		<div className="bar2" />
		<div className="bar3" />
		<div className="bar4" />
		<div className="bar5" />
		<div className="bar6" />
	</div>
);

Spinner.propTypes = {
	className: PropTypes.string.isRequired,
};

export default styled(Spinner)`
	margin: 0 auto;
	width: 60px;
	height: 50px;
	text-align: center;
	font-size: 10px;
	position: absolute;
	top: 50%;
	left: 50%;
	-webkit-animation: fadeIn 1s 0s ease-in-out forwards;
	animation: fadeIn 1s 0s ease-in-out forwards;
	-webkit-transform: translateY(-50%) translateX(-50%);

	& > div {
		height: 100%;
		width: 8px;
		display: inline-block;
		float: left;
		margin-left: 2px;
		-webkit-animation: delay 0.8s infinite ease-in-out;
		animation: delay 0.8s infinite ease-in-out;
	}

	& .bar1 {
		background-color: #006e7f;
	}

	& .bar2 {
		background-color: #09b7bf;
		-webkit-animation-delay: -0.7s;
		animation-delay: -0.7s;
	}

	& .bar3 {
		background-color: #90d36b;
		-webkit-animation-delay: -0.6s;
		animation-delay: -0.6s;
	}

	& .bar4 {
		background-color: #f2d40d;
		-webkit-animation-delay: -0.5s;
		animation-delay: -0.5s;
	}

	& .bar5 {
		background-color: #fcb12b;
		-webkit-animation-delay: -0.4s;
		animation-delay: -0.4s;
	}

	& .bar6 {
		background-color: #f58311;
		-webkit-animation-delay: -0.3s;
		animation-delay: -0.3s;
	}
`;
