import React from "react";
import { Provider } from "react-redux";
import App from "next/app";
import Head from "next/head";
import withRedux from "next-redux-wrapper";
import withReduxSaga from "next-redux-saga";
import { ToastContainer } from "react-toastify";
import configureStore from "~store";
import GlobalStylesheet from "~styles/theme/globalStylesheet";
import toast from "~components/Body/Toast";
import "react-toastify/dist/ReactToastify.css";

export class MyApp extends App {
	componentDidMount() {
		toast({ type: "info", message: "Welcome to the NextJS SSR Kit!" });
	}

	static async getInitialProps({ Component, ctx }) {
		const {
			store: { dispatch, getState },
		} = ctx;
		const { role } = getState().auth;

		if (!role === "guest") {
			dispatch(authenticateUser(ctx));
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
					<ToastContainer
						position="top-right"
						autoClose={2500}
						hideProgressBar={false}
						newestOnTop={false}
						draggable={false}
						pauseOnVisibilityChange
						closeOnClick
						pauseOnHover
					/>
				</Provider>
			</>
		);
	}
}

export default withRedux(configureStore, { debug: false })(
	withReduxSaga(MyApp),
);
