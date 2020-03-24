import React from "react";
import InfoText from "~components/Body/InfoText";
import List from "~components/Body/List";
import ListItem from "~components/Body/ListItem";
import TextContainer from "~components/Body/TextContainer";
import WarningText from "~components/Body/WarningText";
import Link from "~components/Navigation/Link";

const linkStyle = {
	margin: 0,
	padding: 0,
};

const listItemStyle = {
	paddingLeft: 5,
	paddingTop: 20,
	paddingBototm: 20,
	fontSize: 15,
};

const SendingForms = () => (
	<TextContainer>
		<InfoText>
			On the <strong>16th</strong> of each month,{" "}
			<strong>2 months prior</strong> to month in question, an automated service
			will create events and an A/P form for you. The generated A/P form, by
			default, will automatically send email notifications on the{" "}
			<strong>1st of each prior month</strong>. By default, employees will have
			until the <strong>7th of each prior month</strong> to fill out their
			availabilty. This pattern will stay active for the duration of the season.
		</InfoText>
		<br />
		<br />
		<InfoText>Here&#39;s a breakdown example:</InfoText>
		<List>
			<ListItem style={listItemStyle}>
				- On October <strong>16th</strong>, events for the month of December
				will be created; as well as, an A/P form for December 1st - December
				31st.
			</ListItem>
			<ListItem style={listItemStyle}>
				- On November <strong>1st</strong>, the December A/P form will be
				emailed to all active members.
			</ListItem>
			<ListItem style={listItemStyle}>
				- On November <strong>7th</strong>, the December A/P form will expire
				and availability responses will no longer be accepted.
			</ListItem>
			<ListItem style={listItemStyle}>
				- On November <strong>15th</strong>, the December schedule will be
				emailed to all active users.
			</ListItem>
		</List>
		<br />
		<InfoText>
			If you need to include any additional events before the 15th deadline,
			then you can go to the{" "}
			<Link
				blue
				style={linkStyle}
				href="/employee/events/create"
				target="_blank"
			>
				Create Event
			</Link>{" "}
			page, create a new event, and that event will automatically be added to
			the A/P form.
		</InfoText>
		<WarningText>
			Be advised that this service is automated and only currently supports
			creating Sharks home games. The Barracuda home games will need to be
			manually created before the 1st of each prior month.
		</WarningText>
	</TextContainer>
);

export default SendingForms;
