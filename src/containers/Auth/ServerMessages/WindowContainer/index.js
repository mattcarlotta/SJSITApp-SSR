import styled, { css } from "styled-components";

const animateMessage = state => {
	switch (state) {
		case "entering":
			return css`
				top: -200px;
				opacity: 0.01;
			`;
		case "entered":
			return css`
				top: 25px;
				opacity: 1;
			`;
		case "exiting":
			return css`
				top: -200px;
				transition: 0.9s;
				opacity: 0.01;
			`;
		case "exited":
			return css`
				opacity: 0;
			`;
	}
};

export default styled.div`
	left: 50%;
	display: flex;
	transform: translateX(-50%);
	z-index: 1400;
	position: fixed;
	-ms-flex-align: center;
	align-items: center;
	-ms-flex-pack: center;
	justify-content: center;
	transition: 0.3s;
	box-shadow: 0px 3px 5px -1px rgba(0, 0, 0, 0.2),
		0px 6px 10px 0px rgba(0, 0, 0, 0.14), 0px 1px 18px 0px rgba(0, 0, 0, 0.12);

	${({ state }) => animateMessage(state)};
`;
