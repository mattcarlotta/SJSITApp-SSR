import React from "react";
import { FaCalendarCheck, FaClock } from "react-icons/fa";
import InfoText from "~components/Body/InfoText";
import TextContainer from "~components/Body/TextContainer";
import Link from "~components/Navigation/Link";

const iconStyle = {
	position: "relative",
	top: 2,
};

const linkStyle = {
	margin: 0,
	padding: 0,
};

const ViewingMySchedule = () => (
	<TextContainer>
		<InfoText>To view your month to month schedule, go to the</InfoText>
		&nbsp;
		<Link blue style={linkStyle} href="/employee/schedule">
			Schedule
		</Link>
		&nbsp;
		<InfoText>
			page and change the selected <strong>All Games</strong> option to the{" "}
			<strong>My Games</strong> option -- you can also select a{" "}
			<strong>Month</strong> and a <strong>Year</strong> to filter the calendar.
			If you&#39;ve been scheduled to work a game within the selected month and
			year, then you&#39;ll see a button with a scheduled (
			<FaCalendarCheck style={iconStyle} />) icon. Click on the button to view
			its details. Underneath one of the <strong>Scheduled Employees</strong>{" "}
			call times(
			<FaClock style={iconStyle} />
			), you&#39;ll see your name{" "}
			<strong
				style={{
					backgroundColor: "#006d75",
					color: "#fff",
					padding: "5px",
				}}
			>
				<FaCalendarCheck style={iconStyle} /> <span>highlighted</span>
			</strong>{" "}
			to delineate which call time you&#39;ve been assigned to.
		</InfoText>
		<br />
		<br />
		<InfoText>
			You can also view your next scheduled game (within 7 days of the current
			date) that you have been assigned to by going to the
		</InfoText>
		&nbsp;
		<Link blue style={linkStyle} href="/employee/dashboard" target="_blank">
			Dashboard
		</Link>
		&nbsp;
		<InfoText>
			page and, within the <strong>Events</strong> tab, change the{" "}
			<strong>Today</strong> option to the <strong>Upcoming</strong> option.
		</InfoText>
		&nbsp;
	</TextContainer>
);

export default ViewingMySchedule;
