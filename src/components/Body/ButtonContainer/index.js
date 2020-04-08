import styled from "styled-components";

export default styled.div`
	min-height: 54px;
	width: 100%;
	border-radius: 4px;
	background: ${props => {
		if (props.primary)
			return "linear-gradient(90deg, rgba(31, 31, 35, 1) 0%, rgba(15,120,136,1) 50%, rgba(31, 31, 35,1) 100%)";
		if (props.danger)
			return "linear-gradient(90deg, rgba(31, 31, 35, 1) 0%, rgba(245,99,66,1) 50%, rgba(31, 31, 35,1) 100%)";
		return "transparent";
	}};
`;
