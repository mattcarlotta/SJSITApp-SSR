import React from "react";
import { FaClipboardCheck, FaTools } from "react-icons/fa";
import Button from "~components/Body/Button";
import InfoText from "~components/Body/InfoText";
import List from "~components/Body/List";
import ListItem from "~components/Body/ListItem";
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

const btnStyle = {
	display: "inline-block",
};

const listItemStyle = {
	paddingLeft: 5,
	paddingTop: 20,
	paddingBototm: 20,
	fontSize: 15,
};

const GettingStarted = () => (
	<TextContainer>
		<InfoText>
			To get started, please follow these steps in order:
			<List>
				<ListItem style={listItemStyle}>
					<InfoText>
						<strong>1.)</strong> Go to the{" "}
						<Link
							blue
							style={linkStyle}
							href="/employee/seasons/create"
							target="_blank"
						>
							Create Seasons
						</Link>{" "}
						page and fill out the <strong>Season Duration</strong> fields and
						click the
					</InfoText>
					&nbsp;
					<Button
						primary
						width="140px"
						padding="0px"
						marginRight="0px"
						style={btnStyle}
						onClick={null}
					>
						Create Season
					</Button>
					&nbsp;
					<InfoText>
						button to create a new season and <strong>Season ID</strong>. All
						subsequent forms and events should be attached to this{" "}
						<strong>Season ID</strong>.
					</InfoText>
				</ListItem>
				<ListItem style={listItemStyle}>
					<InfoText>
						<strong>2.)</strong> Add members (staff or employees) by going to
						the{" "}
						<Link
							blue
							style={linkStyle}
							href="/employee/members/create"
							target="_blank"
						>
							Create Member
						</Link>{" "}
						page and filling out the <strong>Role</strong> and{" "}
						<strong>Authorized Email</strong> fields. Once completed, click the
					</InfoText>
					&nbsp;
					<Button
						primary
						width="150px"
						padding="0px"
						marginRight="0px"
						style={btnStyle}
						onClick={null}
					>
						Create Member
					</Button>
					&nbsp;
					<InfoText>button to add members.</InfoText>
				</ListItem>
				<ListItem style={listItemStyle}>
					<InfoText>
						<strong>3.)</strong> Create events (games, promotionals, or misc.)
						by going to the{" "}
						<Link
							blue
							style={linkStyle}
							href="/employee/events/create"
							target="_blank"
						>
							Create Event
						</Link>{" "}
						page and: Selecting the <strong>Season ID</strong> you&#39;ve
						created in step 1, selecting the appropriate{" "}
						<strong>Event Type</strong>, <strong>Team</strong>,{" "}
						<strong>Opponent (if applicable)</strong>,{" "}
						<strong>Event Location</strong>, <strong>Event Date</strong>,{" "}
						<strong>Event Attire</strong>, and creating{" "}
						<strong>Scheduling Call Times</strong>. Once completed, click the
					</InfoText>
					&nbsp;
					<Button
						primary
						width="150px"
						padding="0px"
						marginRight="0px"
						style={btnStyle}
						onClick={null}
					>
						Create Event
					</Button>
					&nbsp;
					<InfoText>button to add events.</InfoText>
				</ListItem>
				<ListItem style={listItemStyle}>
					<InfoText>
						<strong>4.)</strong> Create forms (A/P forms) by going to the{" "}
						<Link
							blue
							style={linkStyle}
							href="/employee/forms/create"
							target="_blank"
						>
							Create Form
						</Link>{" "}
						page and: Selecting the <strong>Season ID</strong> you&#39;ve
						created in step 1, selecting the appropriate{" "}
						<strong>Enrollment Month</strong>, <strong>Expiration Date</strong>,
						and the <strong>Send Email Notifications Date (optional)</strong>.
						Once completed, click the
					</InfoText>
					&nbsp;
					<Button
						primary
						width="140px"
						padding="0px"
						marginRight="0px"
						style={btnStyle}
						onClick={null}
					>
						Create Form
					</Button>
					&nbsp;
					<InfoText>
						button to add an A/P form. According to the{" "}
						<strong>Send Email Notifications Date</strong>, email notifications
						will automatically be sent to all active members notifying them that
						a new A/P form has been created and will need to be filled out
						before the <strong>Expiration Date</strong>. Leaving the{" "}
						<strong>Send Email Notifications Date</strong> field blank, will
						send the email notifications immediately.
					</InfoText>
				</ListItem>
				<ListItem style={listItemStyle}>
					<InfoText>
						<strong>5.)</strong> Schedule events by going to the{" "}
						<Link
							blue
							style={linkStyle}
							href="/employee/events/viewall?page=1"
							target="_blank"
						>
							View Events
						</Link>{" "}
						page, underneath the <strong>Table Actions</strong> column, clicking
						on one of the
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
					<InfoText>
						table actions buttons to open a menu, then clicking on the
					</InfoText>
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
						(View & Assign Schedule) button. When the{" "}
						<strong>Event Scheduling</strong> form has loaded, scroll down the
						page until you see an <strong>Employees</strong> column followed by
						one or many call time columns. To assign an employee to a call time,
						left mouse click and hold the employee&#39;s name, drag it over to a
						call time column and release the left mouse click to assign them to
						that call time slot. Once the event has been scheduled, click the
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
					<InfoText>
						button to save the event. According to the{" "}
						<strong>Event Date</strong>, email reminders will be automatically
						sent to all scheduled members, 1 day before the event date,
						notifying them that they&#39;re scheduled to work that particular
						event at their assigned call time slot.
					</InfoText>
				</ListItem>
			</List>
		</InfoText>
	</TextContainer>
);

export default GettingStarted;
