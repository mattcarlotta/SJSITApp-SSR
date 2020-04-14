import React from "react";
import PropTypes from "prop-types";
import { FaUserCircle } from "react-icons/fa";

const { IMAGEAPI } = process.env;

const DisplayAvatar = ({ avatar, style, width }) => {
	const avatarWidth = width || "35px";

	return (
		<div
			id="display-avatar"
			css={`
				width: ${avatarWidth};
				display: inline-block;
			`}
		>
			{avatar ? (
				<img
					css={`
						width: ${avatarWidth};
						border-radius: 50%;
					`}
					src={`${IMAGEAPI}/uploads/${avatar}`}
					alt="avatar"
					style={style}
				/>
			) : (
				<FaUserCircle
					style={{ verticalAlign: "middle", fontSize: avatarWidth }}
				/>
			)}
		</div>
	);
};

DisplayAvatar.propTypes = {
	avatar: PropTypes.string,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
	width: PropTypes.string,
};

export default DisplayAvatar;
