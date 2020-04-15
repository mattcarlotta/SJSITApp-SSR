import React from "react";
import Router from "next/router";
import Head from "~components/Navigation/Head";
import FlexCenter from "~components/Body/FlexCenter";
import Center from "~components/Body/Center";
import Button from "~components/Body/Button";
import Logo from "~images/ITLogo_192x192.png";

const NotFound = () => (
	<div css="background: #000;height: 100vh;">
		<FlexCenter style={{ minHeight: "90vh" }} direction="column" id="notfound">
			<Head title="Page Not Found" />
			<img src={Logo} alt="Logo.png" />
			<div css="color: #025f6d;margin-bottom: 10px;">
				The San Jose Sharks Ice Team
			</div>
			<Center>
				<div css="font-size: 70px;font-weight: bold;margin-bottom: 20px;letter-spacing: 2px; color: red;">
					Page Not Found
				</div>
				<div css="font-size: 18px;margin-bottom: 60px;letter-spacing: 2px;color: #fff;">
					We&#39;re sorry, the page you&#39;ve requested could not be located.
				</div>
				<Button
					tertiary
					marginRight="0px"
					width="175px"
					style={{ margin: "0 auto" }}
					onClick={() => Router.replace("/")}
				>
					Go Back Home
				</Button>
			</Center>
		</FlexCenter>
	</div>
);

export default NotFound;
