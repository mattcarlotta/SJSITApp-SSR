import React from "react";
import PropTypes from "prop-types";
import Icon from "~components/Body/Icon";
import ChevronIcon from "../ChevronIcon";
import DisplayOption from "../DisplayOption";
import Input from "../Input";
import SelectionContainer from "../SelectionContainer";
import SelectText from "../SelectText";

const searchStyle = {
	position: "relative",
	right: 0,
	display: "flex",
	boxSizing: "border-box",
	padding: "10px",
};

const Selection = ({
	disabled,
	errors,
	handleInputChange,
	handleSearchClear,
	handleSelectClick,
	icon,
	isVisible,
	isSearchable,
	placeholder,
	name,
	searchText,
	value,
	width,
}) => (
	<SelectionContainer
		tabIndex={0}
		disabled={disabled}
		errors={errors}
		isVisible={isVisible}
		width={width}
		value={value}
	>
		<SelectText handleSelectClick={!disabled ? handleSelectClick : null}>
			{icon && <Icon type={icon} />}
			<DisplayOption icon={icon} value={value}>
				{isSearchable && !value ? (
					<Input
						type="text"
						aria-label="text search box"
						placeholder={placeholder}
						onChange={handleInputChange}
						value={searchText}
					/>
				) : (
					<span className="selectValue">{!value ? placeholder : value}</span>
				)}
			</DisplayOption>
			{!isSearchable ? (
				<ChevronIcon isVisible={isVisible} />
			) : !value && !searchText ? (
				<Icon style={searchStyle} type="search" />
			) : (
				<Icon
					dataTest="clear-selection"
					color="rgba(255, 0, 0, 0.65) !important"
					onHoverColor="rgba(204, 0, 0, 0.65) !important"
					onClick={() => handleSearchClear({ target: { name, value: "" } })}
					style={searchStyle}
					type="erase"
				/>
			)}
		</SelectText>
	</SelectionContainer>
);

Selection.propTypes = {
	disabled: PropTypes.bool,
	errors: PropTypes.string,
	handleInputChange: PropTypes.func,
	handleSearchClear: PropTypes.func,
	handleSelectClick: PropTypes.func.isRequired,
	icon: PropTypes.string,
	isVisible: PropTypes.bool.isRequired,
	isSearchable: PropTypes.bool,
	name: PropTypes.string,
	searchText: PropTypes.string,
	value: PropTypes.string,
	placeholder: PropTypes.string,
	width: PropTypes.string,
};

export default Selection;
