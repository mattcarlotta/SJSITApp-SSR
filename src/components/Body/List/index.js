/* istanbul ignore file */
import styled from "styled-components";

export default styled.ul`
	list-style: none;
	margin: 0;
	padding: 0;
	color: rgba(0, 0, 0, 0.65);
	overflow: auto;
	scrollbar-width: none; /* Firefox */
	-ms-overflow-style: none; /* IE 10+ */

	/* WebKit */
	::-webkit-scrollbar {
		width: 0;
		height: 0;
	}
`;
