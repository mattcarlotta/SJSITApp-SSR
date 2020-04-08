import React from "react";
import { Provider } from "react-redux";
import App from "next/app";
import Head from "next/head";
import Router from "next/router";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import configureStore from "~store";
import GlobalStylesheet from "~styles/theme/globalStylesheet";
import ServerMessages from "~containers/Auth/ServerMessages";
import app from "~utils/axiosConfig";
import { signin } from "~actions/Auth";
import { parseCookie, parseData } from "~utils/parseResponse";
import { resetServerMessage } from "~actions/Messages";
import dispatchError from "~utils/dispatchError";
import { version } from "../../package.json";
import "~styles/globals/globals.scss";
import "react-toastify/dist/ReactToastify.css";

const scrollToTop = () => window.scrollTo(0, 0);

export class MyApp extends App {
	componentDidMount = () => {
		Router.events.on("routeChangeComplete", scrollToTop);
	};

	componentWillUnmount = () => {
		Router.events.off("routeChangeComplete", scrollToTop);
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
				dispatchError({ dispatch, message: e.toString() });
				return {};
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

	render() {
		const { Component, pageProps, store } = this.props;
		return (
			<>
				<Head>
					<meta charSet="utf-8" />
					<meta name="viewport" content="width=device-width, initial-scale=1" />
					<meta name="theme-color" content="#000000" />
					<meta
						name="description"
						content="Official website for the Sharks Ice Team."
					/>
					<meta name="build version" content={`${version}`} />
					<link rel="icon" href="/favicon.ico" />
				</Head>
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
