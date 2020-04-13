/* istanbul ignore file */
import { Provider } from "react-redux";
import { createElement } from "react";
import { shallow, mount } from "enzyme";
import { RouterContext } from "next/dist/next-server/lib/router-context";
import configureStore from "~store";

const store = configureStore(undefined, { isServer: false, req: null });

//= =============================================================================//
// CUSTOM TESTING FUNCTIONS                                                       /
//= =============================================================================//

/**
 * Factory function to create a ShallowWrapper for a component
 * @function shallowWrap
 * @param {node} Component - Component to be shallowed
 * @param {object} state - initial state for setup.
 * @returns {ShallowWrapper}
 */
export const shallowWrap = (Component, state = null) => {
	const wrapper = shallow(Component);
	if (state) wrapper.setState(state);
	return wrapper;
};

/**
 * Factory function to create a mounted RouterContext wrapper for a Reactcomponent
 * @function withRouterContext
 * @param {node} Component - Component to be mounted
 * @param {object} initialProps - Component props specific to this setup.
 * @param {object} state - Component initial state for setup.
 * @param {array} router - Initial route options for RouterContext.
 * @param {object} options - Options for enzyme's mount
 * @function createElement - Creates a wrapper around passed in component (now we can use wrapper.setProps on root)
 * @returns {MountedRouterWrapper}
 */
export const withRouterContext = (
	Component,
	initialProps = {},
	state = null,
	router = {
		pathname: "/pathname/viewall",
		route: "/pathname/viewall",
		query: { page: "1" },
		asPath: "/pathname/viewall",
	},
	options = {},
) => {
	const wrapper = mount(
		createElement(
			props => (
				<Provider store={store}>
					<RouterContext.Provider value={router}>
						<Component {...props} />
					</RouterContext.Provider>
				</Provider>
			),
			initialProps,
		),
		options,
	);
	if (state) wrapper.find(Component).setState(state);
	return wrapper;
};
