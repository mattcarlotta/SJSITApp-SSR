import React from "react";
import PropTypes from "prop-types";
import { Tooltip } from "antd";
import { FaUserCircle } from "react-icons/fa";
import Button from "~components/Body/Button";

const Avatar = ({ avatar, deleteUserAvatar, openAvatarForm }) => {
	return (
		<>
			<div css="height: 244px;max-width:200px;border-radius: 50%;">
				{avatar ? (
					<img src={avatar} alt="avatar" />
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
				<div css="margin-top: 10px;">
					<Tooltip placement="top" title="Change Avatar">
						<Button
							danger
							type="button"
							padding="5px"
							style={{
								margin: "5 auto",
							}}
							onClick={openAvatarForm}
						>
							Change
						</Button>
					</Tooltip>
					{avatar && (
						<Tooltip placement="top" title="Delete Avatar">
							<Button
								danger
								type="button"
								style={{
									maxWidth: 100,
									marginTop: 5,
									marginLeft: 20,
								}}
								onClick={deleteUserAvatar}
							>
								Delete
							</Button>
						</Tooltip>
					)}
				</div>
			</div>
		</>
	);
};

Avatar.propTypes = {
	avatar: PropTypes.string,
	openAvatarForm: PropTypes.func.isRequired,
	deleteUserAvatar: PropTypes.func.isRequired,
};

export default Avatar;
