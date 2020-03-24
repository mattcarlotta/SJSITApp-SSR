/* eslint-disable no-lonely-if */
import React, { Component } from "react";
import PropTypes from "prop-types";

class ClickHandler extends Component {
	state = {
		isFocused: false,
	};

	componentDidMount() {
		document.addEventListener("mousedown", this.handleClickOutside);
	}

	componentWillUnmount() {
		document.removeEventListener("mousedown", this.handleClickOutside);
	}

	handleClickOutside = ({ target }) => {
		if (
			this.state.isFocused &&
			this.wrapperRef &&
			!this.wrapperRef.contains(target)
		) {
			this.handleBlur();
		}
	};

	handleBlur = () => {
		this.setState({ isFocused: false });
	};

	handleFocus = () => {
		this.setState({ isFocused: true });
	};

	render = () => (
		<span ref={node => (this.wrapperRef = node)}>
			{this.props.children({
				isFocused: this.state.isFocused,
				handleBlur: this.handleBlur,
				handleFocus: this.handleFocus,
			})}
		</span>
	);
}

ClickHandler.propTypes = {
	children: PropTypes.func.isRequired,
};

export default ClickHandler;
/* eslint-enable no-lonely-if */
