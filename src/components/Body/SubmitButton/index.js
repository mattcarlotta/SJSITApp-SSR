import React from "react";
import PropTypes from "prop-types";
import Button from "~components/Body/Button";
import ButtonContainer from "~components/Body/ButtonContainer";
import Submitting from "~components/Body/Submitting";

const SubmitButton = ({ disabled, isSubmitting, title, style }) => (
	<ButtonContainer style={{ marginTop: 5, minHeight: 63, ...style }} primary>
		{isSubmitting ? (
			<Submitting />
		) : (
			<Button
				{...style}
				className="submit"
				disabled={disabled}
				primary
				fontSize="22px"
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
	title: PropTypes.string,
};

export default SubmitButton;
