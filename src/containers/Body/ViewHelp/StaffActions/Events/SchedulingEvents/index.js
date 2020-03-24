import React from "react";
import { Tooltip } from "antd";
import { FaClipboardCheck, FaFileAlt, FaTools } from "react-icons/fa";
import Button from "~components/Body/Button";
import Column from "~components/Body/Column";
import ColumnTitle from "~components/Body/ColumnTitle";
import InfoText from "~components/Body/InfoText";
import Legend from "~components/Body/Legend";
import NoUsers from "~components/Body/NoUsers";
import Row from "~components/Body/Row";
import TextContainer from "~components/Body/TextContainer";
import User from "~components/Body/User";
import UserContainer from "~components/Body/UserContainer";
import Link from "~components/Navigation/Link";

const btnStyle = {
	display: "inline-block",
};

const iconStyle = {
	position: "relative",
	top: 2,
};

const linkStyle = {
	margin: 0,
	padding: 0,
};

const showNotes = notes => (
	<Tooltip trigger="hover" title={notes}>
		<FaFileAlt
			style={{
				marginLeft: 5,
				fontSize: 14,
				position: "relative",
				top: 2,
			}}
		/>
	</Tooltip>
);

const SchedulingEvents = () => (
	<TextContainer>
		<InfoText>
			To schedule an event (games, promotionals, or misc.), go to the{" "}
			<Link
				blue
				style={linkStyle}
				href="/employee/events/viewall?page=1"
				target="_blank"
			>
				View Events
			</Link>{" "}
			page, underneath the <strong>Table Actions</strong> column, click on one
			of the
		</InfoText>
		&nbsp;
		<Button
			width="50px"
			padding="3px"
			marginRight="0px"
			style={btnStyle}
			onClick={null}
		>
			<FaTools style={iconStyle} />
		</Button>
		&nbsp;
		<InfoText>table actions buttons to open a menu, then click on the</InfoText>
		&nbsp;
		<Button
			primary
			width="125px"
			padding="0px"
			marginRight="0px"
			style={btnStyle}
			onClick={null}
		>
			<FaClipboardCheck
				style={{ ...iconStyle, fontSize: 17, marginRight: 5 }}
			/>
			<span>Schedule</span>
		</Button>
		&nbsp;
		<InfoText>
			(View & Assign Schedule) button. Scroll down the page until you see an{" "}
			<strong>EMPLOYEES</strong> column -- each employee will have a colored
			badge that relates to one of the legend&#39;s response colors -- followed
			by one or many call time columns:
		</InfoText>
		<Legend />
		<Row style={{ margin: "10px 0" }}>
			<Column width="200px">
				<ColumnTitle style={{ marginBottom: 5 }}>Employees</ColumnTitle>
				<UserContainer>
					<User response="I want to work.">Lisa Nguyen</User>
					<User response="Available to work.">
						Jamal Brown
						{showNotes("In class until 5pm, but I can work afterward.")}
					</User>
					<User response="Prefer not to work.">Mike Wilson</User>
					<User response="Not available to work.">
						Jane Williams
						{showNotes("Out of town.")}
					</User>
					<User response="No response.">Matt Miller</User>
				</UserContainer>
			</Column>
			<Column width="200px">
				<ColumnTitle style={{ marginBottom: 5 }}>5:30 PM</ColumnTitle>
				<UserContainer>
					<NoUsers />
				</UserContainer>
			</Column>
		</Row>
		<InfoText>
			Any employees that have a{" "}
			<FaFileAlt
				style={{
					fontSize: 14,
					position: "relative",
					top: 2,
				}}
			/>{" "}
			icon next to their name have left a note regarding this particular event.
			To view the note, simply hover over the icon. To assign an employee to a
			call time, hover over an employee&#39;s name and click and hold the mouse
			left click button. Then drag them over to a call time column and release
			the left mouse click button to drop and assign them to that call time
			slot. Once the event has been completely scheduled, click the
		</InfoText>
		&nbsp;
		<Button
			primary
			width="175px"
			padding="0px"
			marginRight="0px"
			style={btnStyle}
			onClick={null}
		>
			Submit Schedule
		</Button>
		&nbsp;
		<InfoText>button to save the schedule.</InfoText>
		<br />
		<br />
		<InfoText>
			According to the <strong>Event Date</strong>, email reminders will be
			automatically sent to all scheduled members, 1 day before the event date,
			notifying them that they&#39;re scheduled to work that particular event at
			their assigned call time slot.
		</InfoText>
	</TextContainer>
);

export default SchedulingEvents;
