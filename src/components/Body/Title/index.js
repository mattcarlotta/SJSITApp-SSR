/* istanbul ignore file */
import styled from "styled-components";

export default styled.h1`
	color: #282c34;
	margin: 15px 0;
	letter-spacing: 1px;
	${({ centered }) => centered && "text-align: center"};
`;
