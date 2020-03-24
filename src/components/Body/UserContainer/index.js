import styled from "styled-components";

export default styled.div`
	height: 100%;
	min-height: 150px;
	transition: background-color 0.2s ease;
	background-color: ${({ isDraggingOver }) =>
		isDraggingOver ? "#ffebe6" : "#ebecf0"};
`;
