/* istanbul ignore file */
import styled from "styled-components";

export default styled.div`
	top: 100%;
	background-color: hsl(0, 0%, 100%);
	border-radius: 4px;
	box-shadow: 0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1);
	position: absolute;
	width: 100%;
	z-index: 1000000;
	box-sizing: border-box;
	max-height: 250px;
	overflow: auto;
`;
