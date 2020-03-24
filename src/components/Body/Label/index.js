import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import { Tooltip } from "antd";
import { GoQuestion } from "react-icons/go";
import Center from "~components/Body/Center";

const Label = ({ className, name, label, style, tooltip }) => (
	<label className={className} style={style} htmlFor={name}>
		{label}
		{tooltip && (
			<span className="tooltip">
				<Tooltip placement="top" title={<Center>{tooltip}</Center>}>
					<GoQuestion />
				</Tooltip>
			</span>
		)}
	</label>
);

Label.propTypes = {
	className: PropTypes.string.isRequired,
	label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
	name: PropTypes.string,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
	tooltip: PropTypes.string,
};

export default styled(Label)`
	color: rgb(0, 0, 0, 0.65);
	display: block;
	margin-bottom: 15px;
	height: 15px;
	line-height: 20px;
	font-size: 20px;

	& .tooltip {
		margin-left: 5px;

		svg {
			font-size: 16px;
			color: #bbb !important;
			position: relative;
			top: 0;
			left: 0;

			&:hover {
				color: #282c34 !important;
			}
		}
	}
`;
