/* istanbul ignore file */
import styled from "styled-components";

export default styled.nav`
	@media (max-width: 980px) {
		text-align: center;
		display: block;
	}
	@media (min-width: 1340px) {
		max-width: 940px;
	}
	display: -ms-flexbox;
	display: flex;
	-ms-flex-align: center;
	align-items: center;
	padding: 20px;
	margin: 0 auto;
`;
