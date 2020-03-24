import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FaExclamationTriangle } from "react-icons/fa";

const iconStyle = {
	position: "relative",
	top: 2,
	marginRight: 5,
};

const WarningText = ({ className, children, style }) => (
	<span className={className} style={style}>
		<FaExclamationTriangle style={iconStyle} /> {children}
	</span>
);

WarningText.propTypes = {
	className: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
};

export default styled(WarningText)`
	margin: 20px 0;
	padding: 10px;
	display: block;
	background-color: #f56342;
	font-weight: bold;
	font-size: 15px;
	color: #fff;
	text-align: center;
`;
