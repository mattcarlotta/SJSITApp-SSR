import styled from "styled-components";

export default styled.div`
	cursor: ${({ disabled }) => (!disabled ? "pointer" : "not-allowed")};
	background-color: ${({ disabled }) => (!disabled ? "#fff" : "#ebebeb")};
	display: inline-block;
	height: 54px;
	width: 100%;
	display: flex;
	min-height: 54px;
	box-sizing: border-box;
	border-radius: 4px;
	border: 1px solid
		${({ errors, isVisible, value }) => {
			if (errors && !value) return "#d14023 !important";
			if (isVisible) return "#1e90ff";
			return "#e5e5e5";
		}};
	transition: all 0.3s ease-in-out;

	svg {
		color: ${({ errors, isVisible, value }) => {
			if (errors && !value) return "#d14023";
			if (isVisible) return "#1e90ff";
			return "#d3dce6";
		}};
	}

	&:hover {
		border: 1px solid
			${({ disabled, isVisible }) => {
				if (disabled) return "#e5e5e5";
				if (isVisible) return "#1e90ff";
				return "#bfbebe";
			}};
	}

	&:focus {
		border: 1px solid ${({ disabled }) => (!disabled ? "#1e90ff" : "#e5e5e5")};
		outline: 0;
	}
`;
