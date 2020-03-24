import React from "react";
import PropTypes from "prop-types";
import Label from "~components/Body/Label";
import Errors from "~components/Forms/Errors";
import Container from "./Container";
import ClickHandler from "./ClickHandler";
import Selection from "./Selection";
import SelectBox from "./SelectBox";
import SelectContainer from "./SelectContainer";
import Options from "./Options";

const Select = ({
	disabled,
	errors,
	name,
	label,
	selectOptions,
	value,
	...props
}) => (
	<Container>
		<Label name={name} label={label} htmlFor={name} />
		<ClickHandler disabled={disabled} onChange={props.onChange}>
			{handlers => (
				<SelectContainer>
					<SelectBox>
						<Selection
							{...handlers}
							{...props}
							name={name}
							disabled={disabled}
							errors={errors}
							value={value}
						/>
						<Options
							{...handlers}
							name={name}
							selectOptions={selectOptions}
							selected={value}
						/>
					</SelectBox>
				</SelectContainer>
			)}
		</ClickHandler>
		{errors && <Errors>{errors}</Errors>}
	</Container>
);

Select.propTypes = {
	disabled: PropTypes.bool,
	errors: PropTypes.string,
	name: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	placeholder: PropTypes.string,
	onChange: PropTypes.func.isRequired,
	selectOptions: PropTypes.arrayOf(PropTypes.string),
	value: PropTypes.string,
};

Select.defaultProps = {
	placeholder: "Select an option...",
};

export default Select;
