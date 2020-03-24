import styled from "styled-components";

export default styled.div`
	min-height: 60px;
	width: 100%;
	border-radius: 4px;
	background-color: ${props => {
		if (props.primary) return "#025f6d";
		if (props.danger) return "#f56342";
		return "transparent";
	}};
`;
