import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FaPlus } from "react-icons/fa";

const iconStyle = {
	position: "relative",
	top: 1,
	fontSize: 16,
};

const AddField = ({ className, onClick, text }) => (
	<button type="button" className={className} onClick={onClick}>
		<FaPlus style={iconStyle} />
		<span className="text">{text}</span>
	</button>
);

AddField.propTypes = {
	className: PropTypes.string.isRequired,
	onClick: PropTypes.func.isRequired,
	text: PropTypes.string.isRequired,
};

export default styled(AddField)`
	width: 100%;
	cursor: pointer;
	outline: none;
	border: 1px dashed #bfbebe;
	text-align: center;
	background: #fff;
	-webkit-transition: all 0.2s ease-in-out;
	transition: all 0.2s ease-in-out;
	margin-bottom: 20px;
	height: 52px;

	& .text {
		padding-left: 5px;
	}

	&:hover {
		color: #40a9ff;
		border-color: #40a9ff;
	}
`;
