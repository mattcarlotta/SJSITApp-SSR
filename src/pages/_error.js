import React from "react";
import Router from "next/router";
import Head from "~components/Navigation/Head";
import FlexCenter from "~components/Body/FlexCenter";
import Center from "~components/Body/Center";
import Button from "~components/Body/Button";
import Logo from "~images/ITLogo_192x192.png";

const NotFound = () => (
	<FlexCenter style={{ minHeight: "90vh" }} id="notfound">
		<Head title="Page Not Found" />
		<div css="margin-bottom: 80px;margin-top: 20px;">
			<Center>
				<img src={Logo} width="100px" alt="logo.png" />
				<div css="font-size: 280px;margin-bottom: 0px;color: #025f6d; padding: 0;">
					404
				</div>
				<div css="font-size: 32px;font-weight: bold;margin-top: -20px;margin-bottom: 20px;letter-spacing: 2px; color: #025f6d;">
					Page not found
				</div>
				<div css="font-size: 18px;margin-bottom: 60px;letter-spacing: 2px;">
					We&#39;re sorry, the page you requested could not be found.
				</div>
				<Button
					primary
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
);

export default NotFound;
