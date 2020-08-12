import React from "react";
import Router from "next/router";
import { useSelector } from "react-redux";
import Button from "~components/Body/Button";
import Spinner from "~components/Body/Spinner";
import LoadingItem from "~components/Body/LoadingItem";
import Head from "~components/Navigation/Head";
import { signinOnLoad } from "~actions/Auth";
import { wrapper } from "~store";
import { parseCookie } from "~utils/parseResponse";

const Home = () => {
	const role = useSelector(({ auth }) => auth.role);
	const isLoggedin = role && role !== "guest";

	console.log("role", role);

	return (
		<>
			<Head title="Home" />
			<Spinner>
				<div css="margin: 20px auto 0;">
					{role ? (
						<Button
							tertiary
							marginRight="0px"
							width="200px"
							onClick={() =>
								Router.push(
									isLoggedin ? "/employee/dashboard" : "/employee/login",
								)
							}
						>
							{isLoggedin ? "Go To Dashboard" : "Employee Login"}
						</Button>
					) : (
						<LoadingItem width="200px">Loading...</LoadingItem>
					)}
				</div>
			</Spinner>
		</>
	);
};

export const getServerSideProps = wrapper.getServerSideProps(
	async ({ store: { dispatch, getState, sagaTask }, req }) => {
		const { role } = getState().auth;

		console.log("role", role);

		if (!role) {
			dispatch(signinOnLoad(parseCookie(req)));
			await sagaTask.toPromise();
		}

		return {};
	},
);

export default Home;
