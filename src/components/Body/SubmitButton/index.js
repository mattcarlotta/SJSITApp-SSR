import React from "react";
import PropTypes from "prop-types";
import Button from "~components/Body/Button";
import ButtonContainer from "~components/Body/ButtonContainer";
import Submitting from "~components/Body/Submitting";

const SubmitButton = ({
	disabled,
	isSubmitting,
	title,
	style,
	submitBtnStyle,
}) => (
	<ButtonContainer style={{ marginTop: 10, ...style }} primary>
		{isSubmitting ? (
			<Submitting style={{ ...submitBtnStyle }} />
		) : (
			<Button
				dataTest="submit-button"
				style={{ ...style, minHeight: 54 }}
				className="submit"
				disabled={disabled}
				primary
				fontSize="22px"
				padding="8.5px 18px"
				type="submit"
			>
				{title}
			</Button>
		)}
	</ButtonContainer>
);

SubmitButton.propTypes = {
	disabled: PropTypes.bool,
	isSubmitting: PropTypes.bool.isRequired,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
	submitBtnStyle: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
	title: PropTypes.string,
};

export default SubmitButton;
