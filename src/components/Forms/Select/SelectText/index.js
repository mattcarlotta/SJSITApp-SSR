import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const SelectText = ({ className, children, handleSelectClick }) => (
	<div className={className} onClick={handleSelectClick}>
		{children}
	</div>
);

SelectText.propTypes = {
	className: PropTypes.string.isRequired,
	children: PropTypes.node.isRequired,
	handleSelectClick: PropTypes.func,
};

export default styled(SelectText)`
	-webkit-box-align: center;
	align-items: center;
	display: flex;
	flex-wrap: wrap;
	position: relative;
	box-sizing: border-box;
	flex: 1 1 0%;
	overflow: hidden;
`;
