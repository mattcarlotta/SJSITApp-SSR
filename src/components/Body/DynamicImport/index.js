/* istanbul ignore file */
/* eslint-disable no-console */
import React, { Component } from "react";
import PropTypes from "prop-types";
import LoadingCard from "~components/Body/LoadingCard";

class DynamicImport extends Component {
	state = {
		Component: null,
	};

	componentDidMount = () => this.importFile();

	componentWillUnmount = () => (this.cancelImport = true);

	cancelImport = false;

	importFile = async () => {
		try {
			const { default: file } = await import(
				/* webpackMode: "lazy" */ `containers/${this.props.file}/index.js`
			);

			if (!this.cancelImport) this.setState({ Component: file });
		} catch (err) {
			console.error(err.toString());
		}
	};

	render = () => {
		const { Component } = this.state;

		return Component ? <Component {...this.props} /> : <LoadingCard />;
	};
}

DynamicImport.propTypes = {
	file: PropTypes.string.isRequired,
};

export default DynamicImport;
/* eslint-enable no-console */
