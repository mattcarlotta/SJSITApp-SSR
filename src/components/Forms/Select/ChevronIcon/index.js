import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { MdChevronRight } from "react-icons/md";

const Chevron = ({ className }) => (
	<div className={className}>
		<MdChevronRight />
	</div>
);

Chevron.propTypes = {
	className: PropTypes.string.isRequired,
};

export default styled(Chevron)`
	display: flex;
	box-sizing: border-box;
	padding: 10px;

	svg {
		vertical-align: middle;
		transform: ${({ isVisible }) =>
			isVisible ? "rotate(90deg)" : "rotate(270deg)"};
		transition: 0.2s ease-in-out;
		transition-property: transform;
	}
`;
