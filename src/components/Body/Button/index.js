/* eslint-disable react/button-has-type */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Button = ({
	className,
	children,
	disabled,
	onBlur,
	onContextMenu,
	onClick,
	onMouseDown,
	onMouseEnter,
	onMouseLeave,
	onTouchStart,
	style,
	type,
}) => (
	<button
		aria-label="button"
		className={className}
		disabled={disabled}
		onBlur={onBlur}
		onClick={onClick}
		onContextMenu={onContextMenu}
		onMouseDown={onMouseDown}
		onMouseEnter={onMouseEnter}
		onMouseLeave={onMouseLeave}
		onTouchStart={onTouchStart}
		style={style}
		tabIndex={0}
		type={type}
	>
		{children}
	</button>
);

Button.propTypes = {
	className: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
	disabled: PropTypes.bool,
	onBlur: PropTypes.func,
	onClick: PropTypes.func,
	onContextMenu: PropTypes.func,
	onMouseDown: PropTypes.func,
	onMouseEnter: PropTypes.func,
	onMouseLeave: PropTypes.func,
	onTouchStart: PropTypes.func,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
	type: PropTypes.string,
};

Button.defaultProps = {
	disabled: false,
	type: "button",
};

export default styled(Button)`
	cursor: ${({ disabled }) => (!disabled ? "pointer" : "not-allowed")};
	display: ${({ display }) => display || "block"};
	color: ${props => (!props.primary && !props.danger ? "#025f6d" : "#fff")};
	background-color: ${props => {
		if (props.primary) return "#025f6d";
		if (props.danger) return "#f56342";
		if (props.tertiary) return "#fff";
		return "transparent";
	}};
	text-transform: ${props => {
		if (props.uppercase) return "uppercase";
		if (props.lowercase) return "lowercase";
		if (props.capitalize) return "capitalize";
		return "none";
	}};
	text-decoration: none;
	margin-right: ${({ marginRight }) => marginRight || "20px"};
	transition: color 0.2s ease-in-out, background 0.2s ease-in-out,
		border 0.2s ease-in-out;
	border-radius: 4px;
	border: 2px solid
		${props => {
			if (props.primary) return "#025f6d";
			if (props.danger) return "#f56342";
			if (props.tertiary) return "#fff";
			return "transparent";
		}};
	width: ${({ width }) => width || "100%"};
	padding: ${({ padding }) => padding || "13px 18px"};
	font-size: ${({ fontSize }) => fontSize || "18px"};
	letter-spacing: 1px;

	&:hover {
		color: ${props => {
			if (props.primary || props.danger) return "#fff";
			return "#04515d";
		}};
		background-color: ${props => {
			if (props.primary) return "#04515d";
			if (props.danger) return "#d24b2e";
			return "#d8d8d8";
		}};
		border: 2px solid
			${props => {
				if (props.primary) return "#04515d";
				if (props.danger) return "#d24b2e";
				if (props.tertiary) return "#d8d8d8";
				return "transparent";
			}};
	}

	&:focus {
		outline: 0;
	}
`;
