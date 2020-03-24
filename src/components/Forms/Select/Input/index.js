/* istanbul ignore file */
import styled from "styled-components";

export default styled.input`
	height: 100%;
	width: 100%;
	border: none;
	color: #282c34;

	&::placeholder {
		color: #d3dce6;
	}

	&:focus {
		outline: 0;
	}
`;
