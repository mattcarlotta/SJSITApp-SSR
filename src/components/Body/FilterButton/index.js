/* eslint-disable react/forbid-prop-types */
import React from "react";
import PropTypes from "prop-types";
import { Popover, Button } from "antd";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";

const iconStyle = {
	position: "relative",
	top: 1,
	fontSize: 12,
};

const FilterButton = ({ id, content, title, value }) => (
	<Popover placement="bottom" trigger="click" content={content}>
		<Button id={id} style={{ marginRight: 5, height: 41 }} onClick={null}>
			<span css="margin-right: 5px;">{title}</span>
			&nbsp;
			{value ? (
				<FaCheckSquare style={iconStyle} />
			) : (
				<FaRegSquare style={iconStyle} />
			)}
		</Button>
	</Popover>
);

FilterButton.propTypes = {
	id: PropTypes.string,
	content: PropTypes.node.isRequired,
	title: PropTypes.string.isRequired,
	value: PropTypes.any,
};

export default FilterButton;
/* eslint-enable react/forbid-prop-types */
