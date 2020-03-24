import styled from "styled-components";

export default styled.div`
	@media (min-width: 1340px) {
		max-width: 1000px;
	}

	margin-left: auto;
	margin-right: auto;
	padding: 0px 30px;
	margin-bottom: 80px;
	width: ${({ width }) => width || "100%"};
	margin-top: 20px;
`;
