import React from "react";
import InfoText from "~components/Body/InfoText";
import List from "~components/Body/List";
import ListItem from "~components/Body/ListItem";
import TextContainer from "~components/Body/TextContainer";
import WarningText from "~components/Body/WarningText";

const listItemStyle = {
	paddingLeft: 5,
	paddingTop: 20,
	paddingBototm: 20,
	fontSize: 15,
};

const AutomatedServices = () => (
	<TextContainer>
		<InfoText>
			The three services that have been automated are:{" "}
			<strong>creating Sharks home games</strong>,{" "}
			<strong>creating monthly A/P forms</strong>, and{" "}
			<strong>creating monthly schedules</strong>. Unfortunately, Barracuda home
			games do have a consumable API (access program interface) available to the
			public, so they&#39;ll need to be manually created before the A/P form is
			sent out.
		</InfoText>
		<br />
		<br />
		<InfoText>
			Here&#39;s an example breakdown of how the automated services will
			function for the month of October and November:
		</InfoText>
		<List>
			<ListItem style={listItemStyle}>
				- On October <strong>1st</strong>, an A/P form for November 1st -
				November 29th will be emailed to all active members.
			</ListItem>
			<ListItem style={listItemStyle}>
				- On October <strong>7th</strong>, the November A/P form will expire and
				availability responses will no longer be accepted.
			</ListItem>
			<ListItem style={listItemStyle}>
				- On October <strong>15th @ 6:00pm</strong>, schedules for the month of
				November will be sent out.
			</ListItem>
			<ListItem style={listItemStyle}>
				- On October <strong>16th</strong>, Sharks home games for the month of
				December will be created; as well as, an A/P form for December 1st -
				December 31st.
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
				- On November <strong>15th @ 6:00pm</strong>, schedules for the month of
				December will be sent out.
			</ListItem>
			<ListItem style={listItemStyle}>
				- On November <strong>16th</strong>, Sharks home games for the month of
				January will be created; as well as, an A/P form for January 1st -
				January 31st.
			</ListItem>
		</List>
		<WarningText>
			Be advised that these services are automated and expect the schedule to
			completed by the 15th of each month -- missing this deadline may result in
			missing/incomplete schedules being emailed. And, currently this service
			only supports creating Sharks home games -- Barracuda home games will need
			to be manually created before the 15th deadline of each month.
		</WarningText>
	</TextContainer>
);

export default AutomatedServices;
