import { PureComponent } from "react";
import PropTypes from "prop-types";
import Router, { withRouter } from "next/router";
import { setQuery, stringifyQuery } from "~utils/queryHelpers";

class QueryHandler extends PureComponent {
	state = setQuery(this.props.router.query);

	static getDerivedStateFromProps = ({ router }) => setQuery(router.query);

	pushToLocation = query =>
		Router.push(`${this.props.router.pathname}?${query}`);

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
	router: PropTypes.shape({
		pathname: PropTypes.string,
		query: PropTypes.objectOf(PropTypes.string),
	}),
	children: PropTypes.func.isRequired,
};

export default withRouter(QueryHandler);
