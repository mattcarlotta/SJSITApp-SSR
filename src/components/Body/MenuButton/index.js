import styled from "styled-components";

export default styled.button`
	cursor: pointer;
	color: #025f6d;
	background-color: transparent;
	transition: color 0.2s ease-in-out, background 0.2s ease-in-out,
		border 0.2s ease-in-out;
	border-radius: 0px;
	border: 2px solid transparent;
	padding: 12px;
	font-size: 20px;
	letter-spacing: 1px;

	&:hover {
		color: #025f6d;
		background-color: ${({ hoverable }) =>
			hoverable ? "#d8d8d8" : "transparent"}};
		border: 2px solid transparent;
	}

	&:focus {
		outline: 0;
	}
`;
