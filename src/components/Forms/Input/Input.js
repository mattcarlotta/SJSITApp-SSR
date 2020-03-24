import React from "react";
import PropTypes from "prop-types";
import Icon from "~components/Body/Icon";
import Label from "~components/Body/Label";
import Errors from "~components/Forms/Errors";
import ClickHandler from "./ClickHandler";

const Input = ({
	className,
	containerStyle,
	errors,
	disabled,
	icon,
	inputStyle,
	label,
	name,
	onChange,
	placeholder,
	readOnly,
	type,
	tooltip,
	value,
}) => (
	<div className={className} style={containerStyle} type={type}>
		<ClickHandler value={value}>
			{({ isFocused, handleBlur, handleFocus }) => (
				<div
					className={[
						isFocused && "focused",
						errors && "error",
						disabled && "disabled",
					]
						.filter(c => !!c)
						.join(" ")}
				>
					{label && (
						<Label name={name} label={label} tooltip={tooltip} htmlFor={name} />
					)}
					<div style={{ display: "flex", alignItems: "center" }}>
						{icon && <Icon type={icon} />}
						<input
							aria-label={name}
							tabIndex={0}
							type={type}
							name={name}
							onBlur={handleBlur}
							onChange={onChange}
							onFocus={handleFocus}
							placeholder={placeholder}
							value={value}
							style={inputStyle}
							disabled={disabled}
							readOnly={readOnly}
						/>
					</div>
					{errors && <Errors>{errors}</Errors>}
				</div>
			)}
		</ClickHandler>
	</div>
);

Input.propTypes = {
	className: PropTypes.string.isRequired,
	containerStyle: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
	disabled: PropTypes.bool,
	errors: PropTypes.string,
	icon: PropTypes.node,
	inputStyle: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
	label: PropTypes.string,
	name: PropTypes.string,
	onChange: PropTypes.func,
	placeholder: PropTypes.string,
	readOnly: PropTypes.bool,
	tooltip: PropTypes.string,
	type: PropTypes.string,
	value: PropTypes.string,
};

Input.defaultProps = {
	disabled: false,
	readOnly: false,
};

export default Input;
