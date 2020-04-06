import React from "react";
import PropTypes from "prop-types";
import { FaUserCircle } from "react-icons/fa";

const DisplayAvatar = ({ avatar, style }) => (
	<div css="width: 35px;display: inline-block;">
		{avatar ? (
			<img
				css="width: 35px;border-radius: 50%;"
				src={avatar}
				alt="avatar"
				style={style}
			/>
		) : (
			<FaUserCircle style={{ verticalAlign: "middle", fontSize: 35 }} />
		)}
	</div>
);

DisplayAvatar.propTypes = {
	avatar: PropTypes.string,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
};

export default DisplayAvatar;
