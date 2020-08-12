import React, { Component } from "react";
import PropTypes from "prop-types";
import { Input } from "antd";
import Button from "~components/Body/Button";

class FilterInput extends Component {
	state = {
		[this.props.name]: this.props.value,
	};

	handleChange = ({ target: { value, name } }) => {
		this.setState({ [name]: value });
	};

	handleSearch = e => {
		e.preventDefault();

		const { name, updateQuery } = this.props;
		const value = this.state[name];

		updateQuery({
			page: 1,
			[name]: value,
		});
	};

	handleClear = () => {
		const { name, updateQuery } = this.props;
		const nextState = { [name]: null };

		this.setState(nextState, () => updateQuery(nextState));
	};

	render = () => {
		const { name, placeholder } = this.props;

		return (
			<form onSubmit={this.handleSearch}>
				<Input
					className="search-field"
					value={this.state[name]}
					name={name}
					placeholder={`Search by ${placeholder}...`}
					style={{ marginBottom: 8, display: "block", width: 205 }}
					onChange={this.handleChange}
				/>
				<Button
					primary
					className="search"
					width="100px"
					padding="2px 0"
					display="inline-block"
					marginRight="5px"
					onClick={this.handleSearch}
				>
					Search
				</Button>
				<Button
					danger
					className="clear"
					display="inline-block"
					width="100px"
					padding="2px 0"
					marginRight="0px"
					onClick={this.handleClear}
				>
					Reset
				</Button>
			</form>
		);
	};
}

FilterInput.propTypes = {
	name: PropTypes.string.isRequired,
	placeholder: PropTypes.string.isRequired,
	value: PropTypes.string,
	updateQuery: PropTypes.func.isRequired,
};

export default FilterInput;
