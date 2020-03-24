import styled from "styled-components";

export default styled.div`
	float: ${({ direction }) => direction || "right"};

	&::before,
	&::after {
		content: "";
		clear: both;
		display: table;
	}
`;
