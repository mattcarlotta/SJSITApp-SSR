import React from "react";
import Head from "~components/Navigation/Head";
import FlexCenter from "~components/Body/FlexCenter";
import Center from "~components/Body/Center";
import Button from "~components/Body/Button";
import Logo from "~images/ITLogo_192x192.png";

const ServerOffline = () => (
	<div css="background: #000;height: 100vh;">
		<FlexCenter style={{ minHeight: "90vh" }} direction="column">
			<Head title="Server Error" />
			<img src={Logo} alt="Logo.png" />
			<div css="color: #025f6d;margin-bottom: 10px;">
				The San Jose Sharks Ice Team
			</div>
			<div css="margin-bottom: 80px;margin-top: 20px;">
				<Center>
					<div css="font-size: 60px;margin-bottom: 20px;color: red; padding: 0;">
						Internal Server Error
					</div>
					<div css="font-size: 50px;margin-bottom: 0px;color: #025f6d; padding: 0;">
						Uh oh, something went wrong on our end.
					</div>
					<div css="font-size: 32px;margin-bottom: 40px;letter-spacing: 2px; color: #025f6d;">
						The San Jose Sharks Ice Team application is temporarily{" "}
						<strong css="color: red;">offline</strong>.
					</div>
					<div css="font-size: 18px;margin-bottom: 10px;letter-spacing: 2px;color: #fff;">
						Please wait a few minutes before refreshing the page. If this issue
						persists, send us a report.
					</div>
					<div css="font-size: 18px;margin-bottom: 60px;letter-spacing: 2px;color: #fff;">
						We sincerely applogize for this inconvience.
					</div>
					<FlexCenter direction="row">
						<Button
							danger
							width="150px"
							marginRight="40px"
							padding="0"
							onClick={null}
						>
							<a
								css=" display:block;color: inherit;text-decoration: none;height: 100%; width: 100%;padding: 13px 18px;"
								rel="noopener noreferrer"
								target="_blank"
								href="mailto:sjsitstaff@gmail.com"
							>
								Report
							</a>
						</Button>
						<Button
							primary
							marginRight="0px"
							width="150px"
							onClick={() => window.location.reload()}
						>
							Refresh
						</Button>
					</FlexCenter>
				</Center>
			</div>
		</FlexCenter>
	</div>
);

export default ServerOffline;
