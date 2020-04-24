import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import StaticIceTeamLogo from "~images/staticIceTeamLogo.png";

const HomeLogo = ({ className }) => (
	<img
		className={className}
		src={StaticIceTeamLogo}
		alt="StaticIceTeamLogo.png"
	/>
);

HomeLogo.propTypes = {
	className: PropTypes.string.isRequired,
};

export default styled(HomeLogo)`
	@media (max-width: 650px) {
		max-width: 250px;
	}

	display: block;
	margin: 0 auto;
	max-width: 40vw;
`;
