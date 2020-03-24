/* istanbul ignore file */
import styled from "styled-components";

export default styled.div`
	display: block;
	height: ${({ height }) => height || "252px"};
	margin: 0 4px;
	padding: 4px 8px;
	color: rgba(0, 0, 0, 0.65);
	background-color: #f7f6f6;
	text-align: left;
	border: 2px solid #e8e8e8;
	overflow-y: auto;
	transition: background 0.3s;
`;
