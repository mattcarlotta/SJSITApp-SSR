import { PureComponent } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { setQuery, stringifyQuery } from "~utils/queryHelpers";

class QueryHandler extends PureComponent {
	state = setQuery(this.props.location.search);

	static getDerivedStateFromProps = ({ location }) => setQuery(location.search);

	pushToLocation = query =>
		Router.push(`${this.props.location.pathname}?${query}`);

	updateQuery = nextQuery =>
		this.pushToLocation(
			stringifyQuery({
				...this.state.queries,
				...nextQuery,
			}),
		);

	clearFilters = () => this.pushToLocation("page=1");

	render = () =>
		this.props.children({
			...this.state,
			clearFilters: this.clearFilters,
			updateQuery: this.updateQuery,
		});
}

QueryHandler.propTypes = {
	location: PropTypes.shape({
		pathname: PropTypes.string,
		search: PropTypes.string,
	}),
	children: PropTypes.func.isRequired,
};

export default QueryHandler;
