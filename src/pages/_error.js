import React from "react";
import { FaBug } from "react-icons/fa";
import Router from "next/router";
import Head from "~components/Navigation/Head";
import FlexCenter from "~components/Body/FlexCenter";
import BackButton from "~components/Body/BackButton";
import Center from "~components/Body/Center";

const NotFound = () => (
	<FlexCenter style={{ height: "100%" }} id="notfound">
		<Head title="Page Not Found" />
		<div css="margin-bottom: 80px;margin-top: 20px;">
			<Center>
				<div css="font-size: 150px;margin-bottom: 0px;color: #025f6d; padding: 0;">
					<FaBug
						style={{
							position: "relative",
							fontSize: 120,
							top: 10,
						}}
					/>{" "}
					<span>404</span>
				</div>
				<div css="font-size: 32px;font-weight: bold;margin-top: -30px;margin-bottom: 20px;letter-spacing: 2px; color: #025f6d;">
					Page not found
				</div>
				<div css="font-size: 18px;margin-bottom: 60px;letter-spacing: 2px;">
					We&#39;re sorry, the page you requested could not be found.
				</div>
				<BackButton
					style={{ margin: "0 auto", width: 120 }}
					push={Router.back}
					title="Go Back"
				/>
			</Center>
		</div>
	</FlexCenter>
);

export default NotFound;
