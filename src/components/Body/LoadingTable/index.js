import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import FadeIn from "~components/Body/FadeIn";

const LoadingTable = ({ className }) => (
	<FadeIn>
		<div className={className}>
			<div className="thead" />
			<div className="tbody" />
		</div>
	</FadeIn>
);

LoadingTable.propTypes = {
	className: PropTypes.string.isRequired,
};

export default styled(LoadingTable)`
	width: 100%;
	border: 1px solid #e8e8e8;
	margin-bottom: 40px;

	& .thead {
		height: 60px;
		width: 100%;
		background-color: #fafafa;
	}

	& .tbody {
		height: 167px;
		width: 100%;
		-webkit-animation: pulse 1.2s infinite;
		animation: pulse 1.2s infinite;
	}
`;
