/* istanbul ignore file */
/* eslint-disable no-console */
import React, { Component } from "react";
import LoadingForm from "~components/Forms/LoadingForm";

class LazyQuill extends Component {
	state = {
		Component: null,
	};

	componentDidMount = () => this.importFile();

	componentWillUnmount = () => (this.cancelImport = true);

	cancelImport = false;

	importFile = async () => {
		try {
			const { default: file } = await import(
				/* webpackMode: "lazy" */ "react-quill"
			);

			await import(/* webpackMode: "lazy" */ "react-quill/dist/quill.snow.css");

			if (!this.cancelImport) this.setState({ Component: file });
		} catch (err) {
			console.error(err.toString());
		}
	};

	render = () => {
		const { Component } = this.state;

		return Component ? <Component {...this.props} /> : <LoadingForm rows={1} />;
	};
}

export default LazyQuill;
/* eslint-enable no-console */
