import React from "react";
import PropTypes from "prop-types";
import { Tooltip } from "antd";
import {
	FaUserCircle,
	FaTrash,
	FaUpload,
	FaCloudUploadAlt,
} from "react-icons/fa";
import Button from "~components/Body/Button";
import FlexCenter from "~components/Body/FlexCenter";

const { IMAGEAPI } = process.env;

const Avatar = ({ avatar, deleteAvatar, openAvatarForm }) => (
	<div id="avatar" css="height: 250px;width:200px;border-radius: 50%;">
		{avatar ? (
			<FlexCenter style={{ height: 192 }}>
				<img
					css="display: block;max-height: 192px;max-width: 192px;border-radius: 50%;margin: 10px auto 0;"
					src={`${IMAGEAPI}/uploads/${avatar}`}
					alt="avatar"
				/>
			</FlexCenter>
		) : (
			<FaUserCircle
				style={{
					height: 190,
					width: 190,
					margin: "0 auto",
					display: "block",
				}}
			/>
		)}
		<FlexCenter
			style={{
				width: 192,
				marginTop: 10,
				marginLeft: "auto",
				marginRight: "auto",
			}}
		>
			<Tooltip
				placement="top"
				title={avatar ? "Update Avatar" : "Upload An Avatar"}
			>
				<Button
					primary
					dataTest="open-avatar-form"
					type="button"
					padding="3px"
					style={{
						margin: !avatar ? "5px auto" : "5px 10px 0 0",
						width: !avatar ? 170 : 50,
					}}
					onClick={openAvatarForm}
				>
					{avatar ? (
						<FaUpload style={{ fontSize: 16 }} />
					) : (
						<>
							<FaCloudUploadAlt
								style={{
									fontSize: 18,
									marginRight: 5,
									position: "relative",
									top: 3,
								}}
							/>
							&nbsp;Upload
						</>
					)}
				</Button>
			</Tooltip>
			{avatar && (
				<Tooltip placement="top" title="Delete Avatar">
					<Button
						danger
						id="delete-avatar"
						dataTest="delete-avatar"
						type="button"
						padding="3px"
						width="50px"
						marginRight="0"
						style={{ marginTop: 5 }}
						onClick={deleteAvatar}
					>
						<FaTrash style={{ fontSize: 16 }} />
					</Button>
				</Tooltip>
			)}
		</FlexCenter>
	</div>
);

Avatar.propTypes = {
	avatar: PropTypes.string,
	openAvatarForm: PropTypes.func.isRequired,
	deleteAvatar: PropTypes.func.isRequired,
};

export default Avatar;
