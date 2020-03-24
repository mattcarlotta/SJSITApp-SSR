import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import FadeIn from "~components/Body/FadeIn";

const LoadingForm = ({ className, rows }) => {
	const inputs = [...Array(rows).keys()];

	return (
		<FadeIn>
			<div className={className}>
				{inputs.map(value => (
					<div key={value} className="input" />
				))}
			</div>
		</FadeIn>
	);
};

LoadingForm.propTypes = {
	className: PropTypes.string.isRequired,
	rows: PropTypes.number.isRequired,
};

export default styled(LoadingForm)`
	min-height: ${({ minHeight }) => minHeight || "500px"};
	width: 100%;

	& .input {
		height: 72px;
		width: 100%;
		margin: 20px 0;
		background-color: #fafafa;
		-webkit-animation: pulse 1.2s infinite;
		animation: pulse 1.2s infinite;
	}
`;
