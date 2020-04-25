import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import FlexCenter from "~components/Body/FlexCenter";
import HomeLogo from "~components/Body/HomeLogo";

export class Spinner extends Component {
	state = { isMounted: false, isIE: false, isEdge: false };

	componentDidMount() {
		const isIE = /* @cc_on!@ */ false || !!document.documentMode;
		const isEdge = !isIE && !!window.StyleMedia;
		this.setState({ isMounted: true, isIE, isEdge });
	}

	render = () => {
		const { isEdge, isIE, isMounted } = this.state;
		const { className, children } = this.props;

		return (
			<div data-test="spinner" className={className}>
				{!isMounted ? null : isIE || isEdge ? (
					<FlexCenter style={{ height: "100%" }} direction="column">
						<HomeLogo />
						{children}
					</FlexCenter>
				) : (
					<div className="container">
						<div className="text-wrapper">
							<span className="text sharks" data-text="sharks">
								sharks
							</span>
							<span className="gradient"></span>
							<span className="spotlight"></span>
						</div>
						<div className="text-wrapper">
							<span className="text iceteam" data-text="ice team">
								ice team
							</span>
							<span className="gradient"></span>
							<span className="spotlight"></span>
						</div>
						{children}
					</div>
				)}
			</div>
		);
	};
}

Spinner.propTypes = {
	className: PropTypes.string.isRequired,
	children: PropTypes.node,
};

export default styled(Spinner)`
	@media (max-width: 600px) {
		.sharks {
			font-size: 55px !important;
		}

		.iceteam {
			font-size: 48px !important;
		}
	}

	@keyframes light {
		to {
			transform: translate(50%, 50%);
		}
	}

	background: #010404;
	height: 100%;

	.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-height: 90%;
	}

	.text-wrapper {
		position: relative;
		overflow: hidden;
		filter: brightness(200%);
	}

	& .text {
		display: flex;
		background-color: black;
		color: white;
		font-weight: bold;
		font-family: sans-serif;
		text-transform: uppercase;
		position: relative;
		user-select: none;

		&::before {
			content: attr(data-text);
			position: absolute;
			filter: blur(0.02em);
			mix-blend-mode: difference;
		}
	}

	& .sharks {
		font-size: 9vw;
	}

	& .iceteam {
		font-size: 7.75vw;
	}

	& .gradient {
		position: absolute;
		background: linear-gradient(
			115deg,
			rgba(6, 227, 250, 1) 5%,
			rgba(229, 151, 64, 1) 98%
		);
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		mix-blend-mode: multiply;
	}

	& .spotlight {
		position: absolute;
		top: -100%;
		left: -100%;
		right: 0;
		bottom: 0;
		background: radial-gradient(circle, white, transparent 25%) center / 25% 25%,
			radial-gradient(circle, white, black 25%) center / 12.5% 12.5%;
		animation: light 6s linear infinite;
		mix-blend-mode: color-dodge;
	}
`;
