/* istanbul ignore file */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const { buildTimeStamp, buildVersion, commitCount, commitHash } = process.env;

const BuildVersion = ({ className }) => (
	<div className={className}>
		<p>SJS Ice Team Scheduling App</p>
		<p>
			build {commitCount}.{commitHash}_{buildVersion}
		</p>
		<p>{buildTimeStamp}</p>
	</div>
);

BuildVersion.propTypes = {
	className: PropTypes.string.isRequired,
};

export default styled(BuildVersion)`
	margin-top: 30px;
	color: rgba(0, 0, 0, 0.25);
	text-align: right;

	p {
		font-size: 15px;
		margin: 0;
		padding: 0;
	}
`;
