import React from "react";
import { Provider } from "react-redux";
import App from "next/app";
import Head from "next/head";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import configureStore from "~store";
import GlobalStylesheet from "~styles/theme/globalStylesheet";
import { authenticateUser } from "~actions/Auth";
import ServerMessages from "~containers/App/ServerMessages";
import "~styles/globals/globals.scss";
import "react-toastify/dist/ReactToastify.css";

export class MyApp extends App {
	static async getInitialProps({ Component, ctx }) {
		const {
			store: { dispatch, getState },
		} = ctx;
		const { role } = getState().auth;

		if (!role) {
			await dispatch(authenticateUser(ctx));
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
