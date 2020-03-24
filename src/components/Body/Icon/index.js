/* istanbul ignore file */
import styled from "styled-components";
import Icon from "./Icon";

export default styled(Icon)`
	display: flex;
	position: absolute;
	padding-left: 16px;
	transition: all 0.3s ease-in-out;
	z-index: 1;

	svg {
		color: ${({ color }) => color || "#d3dce6"};

		&:hover {
			color: ${({ onHoverColor }) => onHoverColor || "#d3dce6"};
		}
	}

	&:focus {
		outline: 0;
	}
`;
