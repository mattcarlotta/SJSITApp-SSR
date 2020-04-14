import React from "react";
import Router from "next/router";
import Head from "~components/Navigation/Head";
import FlexCenter from "~components/Body/FlexCenter";
import Center from "~components/Body/Center";
import Button from "~components/Body/Button";

const NotFound = () => (
	<div css="background: #000;height: 100vh;">
		<FlexCenter style={{ minHeight: "90vh" }} id="notfound">
			<Head title="Page Not Found" />
			<div css="margin-bottom: 80px;margin-top: 20px;">
				<Center>
					<div css="font-size: 280px;margin-bottom: 0px;color: #025f6d; padding: 0;">
						404
					</div>
					<div css="font-size: 32px;font-weight: bold;margin-top: -20px;margin-bottom: 20px;letter-spacing: 2px; color: #025f6d;">
						Page not found
					</div>
					<div css="font-size: 18px;margin-bottom: 60px;letter-spacing: 2px;color: #fff;">
						We&#39;re sorry, the page you requested could not be found.
					</div>
					<Button
						tertiary
						marginRight="0px"
						width="150px"
						style={{ margin: "0 auto" }}
						onClick={() => Router.replace("/")}
					>
						Go Home
					</Button>
				</Center>
			</div>
		</FlexCenter>
	</div>
);

export default NotFound;
