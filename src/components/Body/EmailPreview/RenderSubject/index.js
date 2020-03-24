import React from "react";
import PropTypes from "prop-types";

const RenderSubject = ({ subject }) => (
	<h2>
		{subject || (
			<span id="emptysubject" css="color: red;">
				(empty subject)
			</span>
		)}
	</h2>
);

RenderSubject.propTypes = {
	subject: PropTypes.string,
};

export default RenderSubject;
