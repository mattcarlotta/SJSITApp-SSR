import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FaTimes } from "react-icons/fa";

const CloseButton = ({ className, handleClick }) => (
	<button type="button" className={className} onClick={handleClick}>
		<FaTimes />
	</button>
);

CloseButton.propTypes = {
	className: PropTypes.string.isRequired,
	handleClick: PropTypes.func.isRequired,
};

export default styled(CloseButton)`
	cursor: pointer;
	color: rgba(0, 0, 0, 0.2);
	opacity: 0.5;
	background: transparent;
	border: 0;
	font-size: 20px;

	svg {
		position: relative;
		top: 2px;
	}

	&:hover {
		opacity: 1;
	}

	&:focus {
		outline: 0;
	}
`;
