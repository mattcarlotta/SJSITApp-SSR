import React from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { FaTimes } from "react-icons/fa";
import FlexEnd from "~components/Body/FlexEnd";
import BackgroundOverlay from "../BackgroundOverlay";
import Center from "./Center";
import CloseModalButton from "./CloseModalButton";
import ClickHandler from "./ClickHandler";
import ModalContent from "./ModalContent";
import ModalContainer from "./ModalContainer";
import WindowContainer from "./WindowContainer";

export const Modal = ({ children, disableClickHandler, maxWidth, onClick }) => (
	<>
		<BackgroundOverlay />
		<WindowContainer>
			<ModalContainer>
				<Center maxWidth={maxWidth}>
					<ClickHandler closeModal={!disableClickHandler ? onClick : null}>
						<ModalContent maxWidth={maxWidth}>
							<FlexEnd>
								<CloseModalButton
									id="close-modal"
									aria-label="close modal"
									onClick={() => (onClick ? onClick() : Router.push("/"))}
								>
									<FaTimes />
								</CloseModalButton>
							</FlexEnd>
							{children}
						</ModalContent>
					</ClickHandler>
				</Center>
			</ModalContainer>
		</WindowContainer>
	</>
);

Modal.propTypes = {
	children: PropTypes.node.isRequired,
	disableClickHandler: PropTypes.bool,
	maxWidth: PropTypes.string,
	onClick: PropTypes.func,
};

export default Modal;
