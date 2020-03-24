/* istanbul ignore file */
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Tooltip } from "antd";
import LoadingImage from "./LoadingImage";

const { IMAGEAPI } = process.env;

class DisplayTeam extends Component {
	state = { isLoaded: false };

	componentWillUnmount = () => {
		this.cancelLoad = true;
	};

	handleLoaded = () => {
		if (!this.cancelLoad) this.setState({ isLoaded: true });
	};

	render = () => {
		const { isLoaded } = this.state;

		return (
			<Tooltip placement="top" title={this.props.team}>
				<LoadingImage
					opacity={isLoaded ? 1 : this.props.opacity}
					size={this.props.size}
					duration={isLoaded ? "0s" : undefined}
					bgColor={isLoaded ? "transparent" : undefined}
				>
					<img
						src={`${IMAGEAPI}/${this.props.folder}/${this.props.team}.png`}
						alt={`${this.props.team}.png`}
						onLoad={this.handleLoaded}
						onError={this.handleLoaded}
					/>
				</LoadingImage>
			</Tooltip>
		);
	};
}

DisplayTeam.propTypes = {
	folder: PropTypes.string.isRequired,
	opacity: PropTypes.string,
	size: PropTypes.string,
	team: PropTypes.string.isRequired,
};

export default DisplayTeam;
