import React, { Fragment } from "react";
import Helmet from "react-helmet";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Card, Collapse } from "antd";
import { FaQuestionCircle } from "react-icons/fa";
import { ViewingContact } from "./Other";
import {
	ChangingEmail,
	ChangingEmailPreferences,
	ChangingName,
	ChangingPassword,
	LogoutSession,
	ViewingAvailability,
	ViewingForms,
	ViewingResponses,
	ViewingSchedule,
} from "./GeneralQuestions";
import {
	SubmittingAPForm,
	UpdatingAPForm,
	ViewingMySchedule,
} from "./EmployeeActions";
import {
	AutomatedServices,
	CreatingEvents,
	CreatingForms,
	CreatingMail,
	CreatingMembers,
	CreatingSeasons,
	DeletingEvents,
	DeletingForms,
	DeletingMail,
	DeletingMembers,
	DeletingSeasons,
	EditingEvents,
	EditingForms,
	EditingMail,
	EditingSeasons,
	EditingMemberAuthorizations,
	EditingMembers,
	GettingStarted,
	ResendingEventEmails,
	ResendingFormEmails,
	ResendingMail,
	SchedulingEvents,
	SendingSchedules,
	SendingForms,
	ViewingAllEvents,
	ViewingAllForms,
	ViewingAllMail,
	ViewingAllMembers,
	ViewingAllSeasons,
	ViewMemberAuthorizations,
	ViewingMembersAvailability,
	ViewingMemberProfile,
	ViewingMonthlyMemberSchedule,
	ViewingSchedules,
} from "./StaffActions";

const Panel = Collapse.Panel;
const title = "Help";
const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 20,
};

const Help = ({ role }) => (
	<Fragment>
		<Helmet title={title} />
		<Card
			title={
				<Fragment>
					<FaQuestionCircle style={iconStyle} />
					<span css="vertical-align: middle;">{title}</span>
				</Fragment>
			}
		>
			<Collapse
				accordion
				expandIconPosition="right"
				defaultActiveKey="GeneralQuestions"
			>
				<Panel header="General Questions" key="GeneralQuestions">
					<Collapse expandIconPosition="right">
						<Panel header="How do I change my password?" key="ChangingPassword">
							<ChangingPassword />
						</Panel>
						<Panel header="How do I change my email?" key="ChangingEmail">
							<ChangingEmail />
						</Panel>
						<Panel
							header="How do I change my email preferences?"
							key="ChangingEmailPreferences"
						>
							<ChangingEmailPreferences />
						</Panel>

						<Panel
							header="How do I change my first or last name?"
							key="ChangingName"
						>
							<ChangingName />
						</Panel>
						<Panel
							header="How do I view my monthly availabilty?"
							key="ViewingAvailabilty"
						>
							<ViewingAvailability />
						</Panel>
						<Panel
							header="How do I view my monthly A/P form responses?"
							key="ViewingResponses"
						>
							<ViewingResponses />
						</Panel>
						<Panel header="How do I view an A/P form?" key="ViewingForms">
							<ViewingForms />
						</Panel>
						<Panel
							header="How do I view the monthly schedule?"
							key="ViewingSchedule"
						>
							<ViewingSchedule />
						</Panel>
						<Panel
							header="How do I log out of my current session?"
							key="LogoutSession"
						>
							<LogoutSession />
						</Panel>
					</Collapse>
				</Panel>
				<Panel header="Employee Actions" key="Employee">
					<Collapse expandIconPosition="right">
						<Panel
							header="How do I add my availability to an A/P form?"
							key="SubmittingAPForm"
						>
							<SubmittingAPForm />
						</Panel>
						<Panel
							header="How do I update my A/P form availabilty?"
							key="UpdatingAPForm"
						>
							<UpdatingAPForm />
						</Panel>
						<Panel
							header="How do I view my monthly schedule and/or find out which games I&#39;m scheduled to work?"
							key="ViewingMySchedule"
						>
							<ViewingMySchedule />
						</Panel>
					</Collapse>
				</Panel>
				{role !== "employee" && (
					<Panel header="Staff Actions" key="Staff">
						<Collapse expandIconPosition="right">
							<Panel header="Getting Started" key="GettingStarted">
								<GettingStarted />
							</Panel>
							<Panel header="Automated Services" key="Services">
								<AutomatedServices />
							</Panel>
							<Panel header="Events" key="Events">
								<Collapse expandIconPosition="right">
									<Panel
										header="How do I view all events?"
										key="ViewingAllEvents"
									>
										<ViewingAllEvents />
									</Panel>
									<Panel
										header="How do I create an event?"
										key="CreatingEvents"
									>
										<CreatingEvents />
									</Panel>
									<Panel header="How do I edit an event?" key="EditingEvents">
										<EditingEvents />
									</Panel>
									<Panel
										header="How do I delete an event?"
										key="DeletingEvents"
									>
										<DeletingEvents />
									</Panel>
									<Panel
										header="How do I resend an event's email reminders?"
										key="ResendingEventEmails"
									>
										<ResendingEventEmails />
									</Panel>
									<Panel
										header="How do I schedule/assign employees to an event?"
										key="SchedulingEvents"
									>
										<SchedulingEvents />
									</Panel>
								</Collapse>
							</Panel>
							<Panel header="Forms" key="Forms">
								<Collapse expandIconPosition="right">
									<Panel
										header="How do I view all A/P forms?"
										key="ViewingAllForms"
									>
										<ViewingAllForms />
									</Panel>
									<Panel
										header="How do I send monthly A/P forms?"
										key="SendingForms"
									>
										<SendingForms />
									</Panel>
									<Panel
										header="How do I manually create an A/P form?"
										key="CreatingForms"
									>
										<CreatingForms />
									</Panel>
									<Panel header="How do I edit an A/P form?" key="EditingForms">
										<EditingForms />
									</Panel>
									<Panel
										header="How do I delete an A/P form?"
										key="DeletingForms"
									>
										<DeletingForms />
									</Panel>
									<Panel
										header="How do I resend an A/P form's email notifications?"
										key="ResendingFormEmails"
									>
										<ResendingFormEmails />
									</Panel>
								</Collapse>
							</Panel>
							<Panel header="Mail" key="Mail">
								<Collapse expandIconPosition="right">
									<Panel
										header="How do I view all emails?"
										key="ViewingAllMail"
									>
										<ViewingAllMail />
									</Panel>
									<Panel header="How do I create an email?" key="CreatingMail">
										<CreatingMail />
									</Panel>
									<Panel header="How do I edit an email?" key="EditingMail">
										<EditingMail />
									</Panel>
									<Panel header="How do I delete an email?" key="DeletingMail">
										<DeletingMail />
									</Panel>
									<Panel
										header="How do I resend an email?"
										key="ResendingEmails"
									>
										<ResendingMail />
									</Panel>
								</Collapse>
							</Panel>
							<Panel header="Members" key="Members">
								<Collapse expandIconPosition="right">
									<Panel
										header="How do I view all members?"
										key="ViewingAllMembers"
									>
										<ViewingAllMembers />
									</Panel>
									<Panel
										header="How do I create a member?"
										key="CreatingMembers"
									>
										<CreatingMembers />
									</Panel>
									<Panel
										header="How do I view member authorizations?"
										key="ViewMemberAuthorizations"
									>
										<ViewMemberAuthorizations />
									</Panel>
									<Panel
										header="How do I edit and/or resend member authorizations?"
										key="EditingMemberAuthorizations"
									>
										<EditingMemberAuthorizations />
									</Panel>
									<Panel
										header="How do I view a member's profile/availability/reponses/schedule?"
										key="ViewingMemberProfile"
									>
										<ViewingMemberProfile />
									</Panel>
									<Panel
										header="How do I edit/update/suspend a member?"
										key="EditingMembers"
									>
										<EditingMembers />
									</Panel>
									<Panel
										header="How do I delete a member?"
										key="DeletingMembers"
									>
										<DeletingMembers />
									</Panel>
									<Panel
										header="How do I view all members' availability for the current month's A/P form?"
										key="ViewingMembersAvailability"
									>
										<ViewingMembersAvailability />
									</Panel>
								</Collapse>
							</Panel>
							<Panel header="Schedule" key="Schedule">
								<Collapse expandIconPosition="right">
									<Panel
										header="How do I create monthly schedules?"
										key="SendingSchedules"
									>
										<SendingSchedules />
									</Panel>
									<Panel
										header="How do I view a monthly schedule?"
										key="ViewingSchedules"
									>
										<ViewingSchedules />
									</Panel>
									<Panel
										header="How do I view a member's monthly schedule?"
										key="ViewMemberMonthlySchedule"
									>
										<ViewingMonthlyMemberSchedule />
									</Panel>
								</Collapse>
							</Panel>
							<Panel header="Seasons" key="Seasons">
								<Collapse expandIconPosition="right">
									<Panel
										header="How do I view all seasons?"
										key="ViewingAllSeasons"
									>
										<ViewingAllSeasons />
									</Panel>
									<Panel
										header="How do I create a season?"
										key="CreatingSeasons"
									>
										<CreatingSeasons />
									</Panel>
									<Panel header="How do I edit a season?" key="EditingSeasons">
										<EditingSeasons />
									</Panel>
									<Panel
										header="How do I delete a season?"
										key="DeletingSeasons"
									>
										<DeletingSeasons />
									</Panel>
								</Collapse>
							</Panel>
						</Collapse>
					</Panel>
				)}
				<Panel header="Other" key="ViewingContact">
					<ViewingContact />
				</Panel>
			</Collapse>
		</Card>
	</Fragment>
);

Help.propTypes = {
	role: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
	role: state.auth.role,
});

export default connect(mapStateToProps)(Help);
