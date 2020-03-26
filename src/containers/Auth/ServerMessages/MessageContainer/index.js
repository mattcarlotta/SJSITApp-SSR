import styled from "styled-components";

const typeOfAlert = type => {
	switch (type) {
		case "success":
			return "#43A047";
		case "warning":
			return "#FFA000";
		case "info":
			return "#2979ff";
		default:
			return "#D32F2F";
	}
};

export default styled.div`
	display: -ms-flexbox;
	display: flex;
	background-color: ${({ type }) => typeOfAlert(type)};
	padding: 10px;
	border-radius: 4px;
`;
