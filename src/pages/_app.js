import React from "react";
import { Provider } from "react-redux";
import App from "next/app";
import Router from "next/router";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import NProgress from "nprogress";
import configureStore from "~store";
import GlobalStylesheet from "~styles/theme/globalStylesheet";
import ServerMessages from "~containers/Auth/ServerMessages";
import app from "~utils/axiosConfig";
import { signin } from "~actions/Auth";
import { parseCookie, parseData } from "~utils/parseResponse";
import { resetServerMessage } from "~actions/Messages";
import toast from "~components/Body/Toast";
import "react-toastify/dist/ReactToastify.css";
import "~styles/globals/antd.min.css";
import "~styles/globals/globals.scss";

/**
 * Custom app wrapper to initialize nProgress, redux, redux sagas and initial session authentication.
 *
 * @generator
 * @class MyApp
 * @method componentDidMount - intializes nProgress, intializes Router event listeners for resetting window position on route changes, and displays any server-side generated errors.
 * @method componentWillUnmount - removes Router event listeners.
 * @method getInitialProps - handles authentication and redux initialization for child components.
 */

NProgress.configure({
	trickleSpeed: 100,
});

export class MyApp extends App {
	componentDidMount = () => {
		NProgress.configure({
			showSpinner: false,
		});

		Router.events.on("routeChangeComplete", this.scrollToTop);
		Router.events.on("routeChangeStart", this.startProgress);
		Router.events.on("routeChangeComplete", this.endProgress);
		Router.events.on("routeChangeError", this.endProgress);

		const { serverError } = this.props;
		if (serverError) toast({ type: "error", message: serverError });
	};

	componentWillUnmount = () => {
		Router.events.off("routeChangeComplete", this.scrollToTop);
		Router.events.off("routeChangeStart", this.startProgress);
		Router.events.off("routeChangeComplete", this.endProgress);
		Router.events.off("routeChangeError", this.endProgress);
	};

	static async getInitialProps({ Component, ctx }) {
		const {
			store: { dispatch, getState },
			req,
		} = ctx;
		const { role } = getState().auth;

		dispatch(resetServerMessage());

		if (!role) {
			try {
				const res = await app.get("signedin", parseCookie(req));
				const data = parseData(res);

				dispatch(signin(data));
			} catch (e) {
				return { serverError: e.toString() };
			}
		}

		return {
			pageProps: {
				...(Component.getInitialProps
					? await Component.getInitialProps(ctx)
					: {}),
			},
		};
	}

	scrollToTop = () => window.scrollTo(0, 0);

	startProgress = () => NProgress.start();

	endProgress = () => NProgress.done();

	render() {
		const { Component, pageProps, store } = this.props;
		return (
			<>
				<GlobalStylesheet />
				<Provider store={store}>
					<Component {...pageProps} />
					<ServerMessages />
				</Provider>
			</>
		);
	}
}

export default withRedux(configureStore, { debug: false })(
	withReduxSaga(MyApp),
);
