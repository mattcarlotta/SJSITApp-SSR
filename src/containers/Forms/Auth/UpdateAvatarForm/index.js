import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
	FaUpload,
	FaTimesCircle,
	FaCloudUploadAlt,
	FaTrash,
} from "react-icons/fa";
import { Tooltip } from "antd";
import { updateUserAvatar } from "~actions/Auth";
import Button from "~components/Body/Button";
import FlexCenter from "~components/Body/FlexCenter";
import FlexSpaceAround from "~components/Body/FlexSpaceAround";
import SubmitButton from "~components/Body/SubmitButton";
import toast from "~components/Body/Toast";

const initialState = {
	error: "",
	imagePreview: "",
	file: null,
	isSubmitting: false,
};

export class UpdateImageForm extends Component {
	state = initialState;

	static getDerivedStateFromProps({ serverMessage }) {
		return serverMessage ? { isSubmitting: false } : null;
	}

	componentDidUpdate(prevProps) {
		const { serverMessage } = this.props;

		if (
			prevProps.serverMessage !== serverMessage &&
			serverMessage.indexOf("Successfully") >= 0
		) {
			this.props.closeAvatarForm();
		}
	}

	handleChange = async ({ target: { files } }) => {
		try {
			const file = files[0];

			const isAccepted = ["image/jpg", "image/jpeg", "image/png"].some(
				type => type === file.type,
			);
			const isLt10MB = file.size / 10240000 <= 1;

			if (!isAccepted || !isLt10MB) throw String("Invalid format.");

			const img = new Image();
			img.src = URL.createObjectURL(file);

			await new Promise(
				(resolve, reject) =>
					(img.onload = () =>
						img.width <= 10000 && img.height <= 10000 ? resolve() : reject()),
			);

			this.setState({
				file,
				imagePreview: img.src,
			});
		} catch (e) {
			toast({
				type: "error",
				message: "Only 10mb or less .jpg/.jpeg/.png files are accepted!",
			});
		}
	};

	handleReset = () =>
		this.setState(initialState, () => (this.image.value = null));

	handleSubmit = e => {
		e.preventDefault();
		const { file } = this.state;
		const { id } = this.props;

		if (!file) {
			this.setState({ error: "Required!" }, () =>
				toast({
					type: "error",
					message: "You must provide an image to upload!",
				}),
			);
		} else {
			this.setState({ error: "", isSubmitting: true }, async () => {
				const form = new FormData();
				form.append("file", file);
				this.props.updateUserAvatar({ form, id });
			});
		}
	};

	render = () => {
		const { error, file, imagePreview, isSubmitting } = this.state;

		return (
			<form css="width: 100%; max-width: 200px;" onSubmit={this.handleSubmit}>
				<div
					css={`
						height: 195px;
						width: 100%;
						margin: 0 auto;
						background: #efebeb;
						position: relative;
						border: ${error ? "1px solid #f0506e" : "1px dashed #03a9f3"};
					`}
				>
					{imagePreview ? (
						<div css="min-height: 100%;display: flex;justify-content: center;align-items: center;overflow: hidden;margin: 0 5px;">
							<img
								css="max-height: 180px;"
								src={imagePreview}
								alt="imagePreview"
							/>
						</div>
					) : (
						<FlexCenter
							style={{ padding: 5, textAlign: "center" }}
							direction="column"
						>
							<div css="margin-left: auto;margin-right: auto; margin: 0;">
								<FaCloudUploadAlt style={{ fontSize: 80 }} />
							</div>
							<div css="font-size: 14px;">
								Click <strong>here</strong> or drag an image to this area.
							</div>
							<div css="font-size: 12px;margin: 5px 0 0 0;">
								Accepted formats:
							</div>
							<div css="font-size: 12px;">jpg/jpeg/png &#8804; 10mb</div>
						</FlexCenter>
					)}
					<input
						css="position: absolute;top: 0px;right: 0px;bottom: 0px;left: 0px;opacity: 1e-05;width: 100%;cursor: pointer;z-index: 10;"
						ref={node => (this.image = node)}
						type="file"
						accept="image/*"
						multiple={false}
						onChange={this.handleChange}
					/>
				</div>
				{isSubmitting ? (
					<SubmitButton
						isSubmitting
						title="Uploading..."
						style={{ minHeight: 44 }}
						submitBtnStyle={{ height: 44 }}
					/>
				) : (
					<FlexSpaceAround style={{ width: "200px", paddingBottom: "6px" }}>
						<Tooltip placement="top" title="Upload Image">
							<Button
								primary
								className={!file ? "disabled" : undefined}
								type="submit"
								width="50px"
								marginRight="0"
								padding="5px"
								style={{
									marginTop: 8,
								}}
							>
								<FaUpload
									style={{ fontSize: 17, position: "relative", top: 3 }}
								/>
							</Button>
						</Tooltip>
						<Tooltip placement="top" title="Reset Image">
							<Button
								danger
								type="button"
								width="50px"
								marginRight="0"
								padding="5px"
								style={{ marginTop: 8 }}
								onClick={this.handleReset}
							>
								<FaTrash style={{ position: "relative", top: 3 }} />
							</Button>
						</Tooltip>
						<Tooltip placement="top" title="Cancel Upload">
							<Button
								danger
								type="button"
								width="50px"
								marginRight="0"
								padding="5px"
								style={{ marginTop: 8 }}
								onClick={this.props.closeAvatarForm}
							>
								<FaTimesCircle
									style={{ fontSize: 18, position: "relative", top: 3 }}
								/>
							</Button>
						</Tooltip>
					</FlexSpaceAround>
				)}
			</form>
		);
	};
}

UpdateImageForm.propTypes = {
	id: PropTypes.string.isRequired,
	closeAvatarForm: PropTypes.func.isRequired,
	serverMessage: PropTypes.string,
	updateUserAvatar: PropTypes.func.isRequired,
};

const mapStateToProps = ({ server }) => ({
	serverMessage: server.message,
});

const mapDispatchToProps = {
	updateUserAvatar,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateImageForm);