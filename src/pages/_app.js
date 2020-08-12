/* eslint-disable react/forbid-prop-types */
import * as React from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import Router from "next/router";
import NProgress from "nprogress";
import ServerMessages from "~containers/Auth/ServerMessages";
import { wrapper } from "~store";
import GlobalStylesheet from "~styles/theme/globalStylesheet";
import "react-toastify/dist/ReactToastify.css";
import "~styles/globals/antd.min.css";
import "~styles/globals/globals.scss";

/**
 Custom app wrapper to initialize nProgress, redux, redux sagas and initial session authentication.
*/

NProgress.configure({
	trickleSpeed: 100,
});

export const App = ({ Component, pageProps }) => {
	const scrollToTop = React.useCallback(() => window.scrollTo(0, 0));
	const startProgress = React.useCallback(() => NProgress.start());
	const endProgress = React.useCallback(() => NProgress.done());

	React.useEffect(() => {
		NProgress.configure({ showSpinner: false });

		Router.events.on("routeChangeComplete", scrollToTop);
		Router.events.on("routeChangeStart", startProgress);
		Router.events.on("routeChangeComplete", endProgress);
		Router.events.on("routeChangeError", endProgress);

		return () => {
			Router.events.off("routeChangeComplete", scrollToTop);
			Router.events.off("routeChangeStart", startProgress);
			Router.events.off("routeChangeComplete", endProgress);
			Router.events.off("routeChangeError", endProgress);
		};
	}, []);

	return (
		<>
			<Head>
				<meta
					name="viewport"
					content="width=device-width, initial-scale=1, shrink-to-fit=no"
				/>
			</Head>
			<GlobalStylesheet />
			<Component {...pageProps} />
			<ServerMessages />
		</>
	);
};

App.propTypes = {
	Component: PropTypes.any,
	pageProps: PropTypes.any,
	role: PropTypes.string,
};

export default wrapper.withRedux(App);
