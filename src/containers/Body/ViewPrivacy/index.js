import React from "react";
import { Card } from "antd";
import { FaBalanceScale } from "react-icons/fa";
import Head from "~components/Navigation/Head";
import Line from "~components/Body/Line";
import InfoText from "~components/Body/InfoText";
import Title from "~components/Body/Title";
import Link from "~components/Navigation/Link";

const title = "Privacy & Warranty Policy";

const style = { fontSize: 18 };
const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 20,
};
const linkStyle = {
	margin: 0,
	padding: 0,
};

const ViewPrivacyPage = () => (
	<>
		<Head title={title} />
		<Card
			title={
				<>
					<FaBalanceScale style={iconStyle} />
					<span css="vertical-align: middle;">{title}</span>
				</>
			}
		>
			<div css="padding: 0 30px 30px 30px;">
				<Title>PRIVACY & WARRANTY POLICY</Title>
				<Line style={{ marginBottom: 10 }} />
				<InfoText>
					This Privacy Policy explains how the San Jose Sharks Ice
					Team(collectively, the &#34;SJS Ice Team,&#34; &#34;Sharks Ice
					Team,&#34; the &#34;Ice Team&#34;, &#34;we,&#34; &#34;our,&#34;
					&#34;us&#34;) and its affiliates use information in operating this
					website and any other online service that displays or provides an
					authorized link to this Privacy Policy (collectively, our
					&#34;Services&#34;). Please note that this Privacy Policy does not
					apply to the websites, apps, or services of the San Jose Sharks Ice
					Team, which are governed by the individual privacy policies. By using
					our Services, you consent to the practices described in this Privacy
					Policy. If you have any questions about this Privacy Policy, please
					contact us using our{" "}
					<Link
						blue
						style={linkStyle}
						href="/employee/contact-us"
						target="_blank"
					>
						Contact Us
					</Link>{" "}
					form.
				</InfoText>
				<Title style={style}>
					Information We Collect or Receive When You Use Our Services.
				</Title>
				<InfoText>
					The information we collect and receive is: Information You Provide
					Directly. We receive the information you choose to provide when using
					our Services. For example, when you register for our Services, you may
					be asked to provide information about yourself including: Your first
					and last name, email address, and an encrypted password when you use
					of our Services. We do not collect nor store any other information via
					cookies, web beacons, nor third party services and technologies. We
					also do not use the names or email addresses submitted in these
					circumstances for any purpose other than sending an email on your
					behalf, unless we obtain your consent or the recipient&#39;s consent.
				</InfoText>
				<InfoText>
					We also may collect or receive information when you use our Services.
					We may receive: Log information. This is information we automatically
					collect and store when you use our Services. It may include, for
					example: Information about your interactions with our Services,
					including the content you view, the date on which you accessed our
					Services, and information in similar technologies. Information about
					how you access our Services, including your browser or operating
					system, and your Internet Protocol (&#34;IP&#34;) address. Device
					information. This is information we automatically collect and store
					concerning the device you use when you access our Services. (Note that
					by &#34;device,&#34; we mean anything you use to access our Services).
					Device information may include, for example: The type of device you
					are using (e.g., your particular brand of phone or tablet); Certain
					device identifiers which may be unique to your device; and Your
					Internet service provider. Location information.
				</InfoText>
				<Title style={style}>
					How We Use the Information We Collect or Receive.
				</Title>
				<InfoText>
					The information we collect and receive is used for the following
					purposes: To provide our Services. We use the information we collect
					or receive to provide you with the Services you use or request. For
					example, we use this information to: Create accounts; Provide
					technical support and respond to user inquiries; Send you electronic
					and other marketing communications that may be tailored to your
					preferences and interests; Notify you about updates to our Services or
					send other communications that are relevant to your use of our
					Services; and Enhance our ability to detect and prevent fraud and
					potentially illegal activities in connection with our Services and
					otherwise enforce our Terms of Service.
				</InfoText>
				<Title style={style}>Cookies.</Title>
				<InfoText>
					Our Services use online technologies called &#34;cookies,&#34; as well
					as other local storage technologies. This section explains what these
					technologies are and how they may be used. Cookies and Other Local
					Storage Technologies Generally speaking, &#34;cookies&#34; are text
					files that are placed in your device&#39;s browser, and that can be
					used to help recognize your browser across different web pages,
					websites, and browsing sessions. Cookies are stored on your device or
					in &#34;local storage.&#34;. Your browser&#39;s privacy controls may
					enable you to manage other types of local storage. Our Services may
					use cookies or other local storage technologies in combination with
					other information about you to enhance and personalize your experience
					on our Services (or elsewhere online), including: to help authenticate
					you when you use our Services and to remember your preferences.
				</InfoText>
				<Title style={style}>Security.</Title>
				<InfoText>
					We have adopted physical, technical, and administrative safeguards to
					help protect against theft, loss, misuse, and unauthorized access to
					or disclosure of the information we collect and receive. However,
					please note that no data transmission or storage can be guaranteed to
					be 100% secure. As a result, while we strive to protect your
					information and privacy, we cannot and do not guarantee or warrant the
					security of any information you disclose or transmit to our Services
					and cannot be responsible for the theft, destruction, or inadvertent
					disclosure of your information, or any other disclosures out of our
					control. Your online access to some of your information may be
					protected with a password that you select. We strongly recommend that
					you do not disclose your password to anyone. We will never ask you for
					your password in any unsolicited communication (such as letters, phone
					calls, or email messages).
				</InfoText>
				<Title style={style}>Changes To This Privacy Policy.</Title>
				<InfoText>
					We may update this Privacy Policy from time to time to reflect changes
					in our privacy practices, so we encourage you to review this Privacy
					Policy periodically. If we make significant changes to this Privacy
					Policy, we will provide appropriate notice to you.
				</InfoText>
				<Title style={style}>Disclaimer of Warranties.</Title>
				<InfoText>
					YOUR USE OF THE SERVICES IS ENTIRELY AT YOUR OWN RISK. WE MAKE NO
					REPRESENTATIONS OR WARRANTIES ABOUT THE SERVICES, INCLUDING, WITHOUT
					LIMITATION, THE OPERATION OF THE SERVICES OR THE INFORMATION,
					MATERIALS, GOODS, OR SERVICES APPEARING OR OFFERED ON THE SERVICES OR
					WITH RESPECT TO ANY WEBSITES OR SERVICES LINKED FROM THE SERVICES. THE
					SERVICES ARE PROVIDED &#34;AS IS&#34;, &#34;WITH ALL FAULTS,&#34; AND
					&#34;AS AVAILABLE.&#34; WITHOUT LIMITING THE GENERALITY OF THE
					FOREGOING, WE DISCLAIM ALL WARRANTIES AND CONDITIONS, EXPRESS,
					STATUTORY, OR IMPLIED, INCLUDING BUT NOT LIMITED TO (I) THE WARRANTIES
					OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, WORKMANLIKE
					EFFORT, TITLE, QUIET ENJOYMENT, NO LIENS, AND NO ENCUMBRANCES; (II)
					THE WARRANTIES AGAINST INFRINGEMENT, MISAPPROPRIATION, OR VIOLATION OF
					ANY INTELLECTUAL PROPERTY OR PROPRIETARY RIGHTS OF ANY PERSON; AND
					(III) THE WARRANTIES RELATING TO THE ACCURACY, RELIABILITY,
					CORRECTNESS, OR COMPLETENESS OF DATA OR CONTENT MADE AVAILABLE ON THE
					SERVICES OR OTHERWISE BY THE San Jose Sharks Ice Team. FURTHER, THERE
					IS NO WARRANTY THAT THE SERVICES WILL MEET YOUR NEEDS OR REQUIREMENTS
					OR THE NEEDS OR REQUIREMENTS OF ANY OTHER PERSON OR THE NEEDS OR
					REQUIREMENTS SET FORTH IN ANY DOCUMENTATION. WE MAKE NO WARRANTIES,
					EXPRESS, STATUTORY, OR IMPLIED, THAT THE SERVICES, INCLUDING, WITHOUT
					LIMITATION, THE San Jose Sharks Ice Team CONTENT, FUNCTIONS, OR
					MATERIALS CONTAINED THEREIN, WILL BE TIMELY, SECURE, ACCURATE,
					ERROR-FREE, COMPLETE, UP-TO-DATE, FREE OF VIRUSES, OR UNINTERRUPTED.
					THE SJS ICE TEAM MAKES NO REPRESENTATION THAT THE SERVICES ARE
					APPROPRIATE OR AVAILABLE FOR USE OUTSIDE OF THE UNITED STATES. NO ORAL
					OR WRITTEN INFORMATION MADE AVAILABLE BY OR ON BEHALF OF THE San Jose
					Sharks Ice Team SHALL CREATE ANY WARRANTY. IF APPLICABLE LAW DOES NOT
					ALLOW THE EXCLUSION OF SOME OR ALL OF THE ABOVE IMPLIED OR STATUTORY
					WARRANTIES TO APPLY TO YOU, THE ABOVE EXCLUSIONS WILL APPLY TO YOU TO
					THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW.
				</InfoText>
				<Title style={style}>Contact Us.</Title>
				<InfoText>
					If you have any questions about this Privacy and/or Warranty Policy or
					any of our practices, please contact us by using the{" "}
					<Link
						blue
						style={linkStyle}
						href="/employee/contact-us"
						target="_blank"
					>
						Contact Us
					</Link>{" "}
					form.
				</InfoText>
			</div>
		</Card>
	</>
);

export default ViewPrivacyPage;
