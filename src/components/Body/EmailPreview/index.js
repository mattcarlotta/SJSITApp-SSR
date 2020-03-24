import React from "react";
import PropTypes from "prop-types";
import Modal from "~components/Body/Modal";
import SubmitButton from "~components/Body/SubmitButton";
import RenderMessage from "./RenderMessage";
import RenderSendFrom from "./RenderSendFrom";
import RenderSendTo from "./RenderSendTo";
import RenderSubject from "./RenderSubject";

const EmailPreview = ({
	fields,
	handleCloseModal,
	isSubmitting,
	submitTitle,
}) => {
	const { message, sendDate, sendFrom, subject } = fields;

	return (
		<Modal disableClickHandler maxWidth="1200px" onClick={handleCloseModal}>
			<div css="width: 100%;margin-top: 20px;padding: 20px;border: 1px dashed #e4e2e2;background-color: #fdfdfd;">
				<table css="width: 100%;">
					<tbody>
						<tr>
							<td>
								<RenderSubject subject={subject} />
								<table css="width: 100%;">
									<tbody>
										<RenderSendFrom sendDate={sendDate} sendFrom={sendFrom} />
										<RenderSendTo fields={fields} />
									</tbody>
								</table>
							</td>
						</tr>
						<RenderMessage message={message} />
					</tbody>
				</table>
			</div>
			<SubmitButton
				style={{
					width: "600px",
					marginLeft: "auto",
					marginRight: "auto",
					marginTop: "20px",
					textAlign: "center",
				}}
				title={submitTitle}
				isSubmitting={isSubmitting}
			/>
		</Modal>
	);
};

EmailPreview.propTypes = {
	fields: PropTypes.shape({
		message: PropTypes.string,
		sendTo: PropTypes.arrayOf(PropTypes.string),
		sendFrom: PropTypes.string,
		sendDate: PropTypes.string,
		subject: PropTypes.string,
	}),
	handleCloseModal: PropTypes.func.isRequired,
	isSubmitting: PropTypes.bool,
	submitTitle: PropTypes.string.isRequired,
};

export default EmailPreview;
