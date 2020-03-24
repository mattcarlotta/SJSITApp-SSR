/* istanbul ignore file */
import styled from "styled-components";

export default styled.div`
	@media (max-width: 1425px) {
		width: 100%;
	}
	width: ${({ width }) => width || "100%"};
	min-width: 225px;
	background-color: #ebecf0;
	border-radius: 3px;
	box-sizing: border-box;
	display: flex;
	flex-direction: column;
	position: relative;
	white-space: normal;
	padding: 8px;
	margin: 5px;
`;
