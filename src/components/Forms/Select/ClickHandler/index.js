/* eslint-disable no-lonely-if */
import React, { Component } from "react";
import PropTypes from "prop-types";

class ClickHandler extends Component {
	state = {
		isVisible: false,
		searchText: "",
	};

	componentDidMount() {
		document.addEventListener("mousedown", this.handleClickOutside);
		document.addEventListener("keydown", this.handleTabPress);
	}

	componentWillUnmount() {
		document.removeEventListener("mousedown", this.handleClickOutside);
		document.removeEventListener("keydown", this.handleTabPress);
	}

	handleTabPress = ({ key, target }) => {
		if (key === "Tab") {
			if (
				!this.props.disabled &&
				!this.state.isVisible &&
				this.wrapperRef &&
				this.wrapperRef.contains(target)
			) {
				this.handleOpen();
			} else {
				if (
					!this.props.disabled &&
					this.state.isVisible &&
					this.wrapperRef &&
					!this.wrapperRef.contains(target)
				) {
					this.handleClose();
				}
			}
		}
	};

	handleClickOutside = ({ target }) => {
		if (
			!this.props.disabled &&
			this.state.isVisible &&
			this.wrapperRef &&
			!this.wrapperRef.contains(target)
		) {
			this.handleClose();
		}
	};

	handleInputChange = ({ target: { value } }) => {
		this.setState({ searchText: value, isVisible: true });
	};

	handleSearchClear = props => {
		this.setState({ searchText: "" }, () => this.props.onChange({ ...props }));
	};

	handleClose = () => {
		this.setState({ isVisible: false });
	};

	handleOpen = () => {
		this.setState({ isVisible: true });
	};

	handleSelectClick = () => {
		this.setState(prevState => ({ isVisible: !prevState.isVisible }));
	};

	handleOptionSelect = props => {
		this.setState({ isVisible: false, searchText: "" }, () =>
			this.props.onChange({ ...props }),
		);
	};

	render = () => (
		<div className="clickhandler" ref={node => (this.wrapperRef = node)}>
			{this.props.children({
				isVisible: this.state.isVisible,
				handleInputChange: this.handleInputChange,
				handleSearchClear: this.handleSearchClear,
				handleSelectClick: this.handleSelectClick,
				handleOptionSelect: this.handleOptionSelect,
				searchText: this.state.searchText,
			})}
		</div>
	);
}

ClickHandler.propTypes = {
	disabled: PropTypes.bool,
	onChange: PropTypes.func.isRequired,
	children: PropTypes.func.isRequired,
};

export default ClickHandler;
/* eslint-enable no-lonely-if */
