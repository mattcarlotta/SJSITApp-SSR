// Error Messages //

const accessDenied =
	"Your access to the requested page was denied. You do not have the correct account permissions.";

const alreadyLoggedIn =
	"It looks like you are already logged in to another session. Please refresh your browser.";

const alreadyVerified =
	"It looks like you have already been verified. You can log into your account at any time.";

const badCredentials =
	"There was a problem with your login credentials. Please make sure your username and password are correct.";

const emailAlreadyTaken =
	"That email is already in use and is associated with an active account.";

const emailAssociatedWithKey =
	"That email is already associated with another authorization key. Please delete the old authorization key or use a different email.";

const emptyPassword =
	"You must supply a new password in order to reset the old. Please try again.";

const expiredForm = expirationDate =>
	`The window to view and update this form was closed on ${expirationDate}.`;

const expiredToken =
	"The authorization key that was provided has expired. Please contact the staff supervisor to issue a new key.";

const formAlreadyExists =
	"The selected Enrollment Month dates have already been assigned to another A/P form. Please choose different dates.";

const invalidAuthTokenRequest =
	"You must supply an email, a role, and a season before you can create an authorization key.";

const invalidContactUsRequest =
	"Unable to send your message. You must supply a message, subject, and a sendTo address in order to contact us.";

const invalidCreateEventRequest =
	"You must include all required fields to create a new event.";

const invalidEventDate = (seasonId, seasonStartDate, seasonEndDate) =>
	`The event date selected below falls outside of the ${seasonId} season. Please select a date within ${seasonStartDate} - ${seasonEndDate} or update the season's start and end date range.`;

const invalidDeleteTokenRequest =
	"Unable to delete the authorization key. The supplied authorization key does not exist.";

const invalidEmail =
	"That email is not associated with an active account. Please make sure to supply a valid registered email in order to resend a verification!";

const invalidExpirationDate =
	"The selected 'Expiration Date' has already past. Please select a later date.";

const invalidSendDate =
	"The selected 'Send Date' has already past. Please select a later date.";

const invalidSendEmailNoteDate =
	"The selected 'Send Email Notifications Date' has already past. Please select a later date.";

const invalidSession =
	"Your login session has expired. Please log into your account again.";

const invalidSignupEmail =
	"There was a problem authenticating your request. The authorized key that was supplied does not match the staff approved email.";

const invalidPassword =
	"The current password you've supplied does not match our records. Please try again.";

const invalidSeason =
	"There was a problem assigning you to a season. If you've already selected a season, but are unable to continue, please contact the webmaster: carlotta.matt@gmail.com.";

const invalidSeasonId = "Invalid season. The selected season does not exist.";

const invalidStatus =
	"Access to your account was revoked. The account you're trying to log into has been permanently suspended.";

const invalidToken =
	"There was a problem authenticating your request. The authorized key and/or email that was supplied was invalid.";

const invalidUpdateEventRequest =
	"You must inclide all fields to update an exisiting event.";

const missingDates = "You must supply a start date and end date.";

const missingEmailCreds =
	"That email is not associated with an active account. Please make sure the email address is spelled correctly.";

const missingEventId = "You must provide an event id.";

const missingFormId = "You must provide a form id.";

const missingTeamId = "You must provide a team id.";

const missingIds =
	"Unable to delete the select documents. You must provide ids to remove.";

const missingMailId = "You must provide a mail id.";

const missingMemberId = "You must provide a member id.";

const missingPasswords =
	"You must supply both your current password and a new password.";

const missingSeasonId = "You must provide a season id.";

const missingSignupCreds =
	"Invalid sign up request. You must supply a valid: authorization key, authorized email, first name, last name and password.";

const missingToken = "There was a problem authenticating your request.";

const missingTokenId = "You must include a tokenId.";

const missingUpdateMemberParams =
	"You must include an id, email, email reminder, first name, last name and role fields.";

const missingUpdateMemberStatusParams =
	"You must provide a member id and status.";

const missingUpdateTokenParams =
	"You must supply a token id, an authorized email, a role, and a season id before you can update an existing authorization key.";

const mustContainUniqueCallTimes =
	"One or more of the 'Scheduling Call Times' is a duplicate. Please remove the duplicate(s) before submitting the form again.";

const needToCreateSeasonFirst =
	"You must create a season before you can start adding events and forms.";

const notUniquePassword =
	"Your new password must not match your current password. Please try again.";

const seasonAlreadyExists =
	"That season already exists. Please edit the current season or choose a different start and end dates.";

const teamAlreadyExists =
	"That team already exists. Please edit the current team or use a different team name.";

const tokenAlreadyUsed =
	"The supplied authorization key has already been used and is associated with an active account. Please contact the webmaster if this error continues: carlotta.matt@gmail.com.";

const unableToCreateNewForm =
	"Unable to create a new form. You must provide the seasonId, startMonth, endMonth, and expirationDate fields.";

const unableToCreateNewMail =
	"Unable to create a new email. You must provide a message, send to email address(es), send from address, and a subject.";

const unableToCreateNewSeason =
	"Unable to create a new season. You must provide the seasonId, startDate, and endDate fields.";

const unableToCreateTeam =
	"Unable to create a new team. You must provide the league and team name fields.";

const unableToDeleteEvent =
	"Unable to delete that event. That event doesn't exist.";

const unableToDeleteForm =
	"Unable to delete that form. That form doesn't exist.";

const unableToDeleteMail =
	"Unable to delete that email. That email doesn't exist.";

const unableToDeleteSeason =
	"Unable to delete that season. That season doesn't exist.";

const unableToDeleteSeasons =
	"Unable to delete those seasons. Those seasons don't exist.";

const unableToDeleteMember =
	"Unable to delete that member. That member doesn't exist.";

const unableToDeleteTeam = "Unable to delete that team. That team don't exist.";

const unableToLocateContacts =
	"Unable to locate staff or admin contacts. Please try again later.";

const unableToLocateEvent =
	"Unable to locate that event. That event doesn't exist.";

const unableToLocateEvents = (startMonth, endMonth) =>
	`Unable to locate any events. There doesn't appear to be any events between ${startMonth}-${endMonth}.`;

const unableToLocateForm =
	"Unable to locate that form. That form doesn't exist.";

const unableToLocateMail =
	"Unable to locate that email. That email doesn't exist.";

const unableToLocateMember =
	"Unable to locate that member. That member doesn't exist.";

const unableToLocateMembers =
	"Unable to locate any members. You need to create members before you can do that.";

const unableToLocateSeason =
	"Unable to locate that season. That season doesn't exist.";

const unableToLocateToken =
	"Unable to locate that token. That authorization key doesn't exist.";

const unableToUpdateApForm =
	"Unable to update the A/P form. You must provide an id and all responses.";

const unableToUpdateForm =
	"Unable to update the existing form. You must provide an id, season id, start of month date, end of month date, and expiration date.";

const unableToUpdateMail =
	"Unable to update the existing email. You must provide an id, message, send to email address(es) and a subject.";

const unableToUpdateSeason =
	"Unable to update the existing season. You must provide an id, season id, start date, and end date.";

const unableToUpdateToken =
	"Unable to update this authorization key. The key has already been used and is associated with an active account.";

const usernameAlreadyTaken =
	"The first and last name provided is already in use and is associated with an active account. In order to continue, please use a uniquely identifable name such as a first middle name initial or a nickname.";

export {
	accessDenied,
	alreadyLoggedIn,
	alreadyVerified,
	badCredentials,
	emailAlreadyTaken,
	emailAssociatedWithKey,
	emptyPassword,
	expiredForm,
	expiredToken,
	formAlreadyExists,
	invalidAuthTokenRequest,
	invalidContactUsRequest,
	invalidCreateEventRequest,
	invalidDeleteTokenRequest,
	invalidEmail,
	invalidEventDate,
	invalidExpirationDate,
	invalidPassword,
	invalidSeason,
	invalidSeasonId,
	invalidSendDate,
	invalidSendEmailNoteDate,
	invalidSession,
	invalidSignupEmail,
	invalidStatus,
	invalidToken,
	invalidUpdateEventRequest,
	missingDates,
	missingEmailCreds,
	missingEventId,
	missingFormId,
	missingTeamId,
	missingIds,
	missingMailId,
	missingMemberId,
	missingPasswords,
	missingSeasonId,
	missingSignupCreds,
	missingToken,
	missingTokenId,
	missingUpdateMemberParams,
	missingUpdateMemberStatusParams,
	missingUpdateTokenParams,
	mustContainUniqueCallTimes,
	needToCreateSeasonFirst,
	notUniquePassword,
	seasonAlreadyExists,
	teamAlreadyExists,
	tokenAlreadyUsed,
	unableToCreateNewForm,
	unableToCreateNewMail,
	unableToCreateNewSeason,
	unableToCreateTeam,
	unableToDeleteEvent,
	unableToDeleteForm,
	unableToDeleteMail,
	unableToDeleteMember,
	unableToLocateMembers,
	unableToDeleteSeason,
	unableToDeleteSeasons,
	unableToDeleteTeam,
	unableToLocateContacts,
	unableToLocateEvent,
	unableToLocateEvents,
	unableToLocateForm,
	unableToLocateMail,
	unableToLocateMember,
	unableToLocateSeason,
	unableToLocateToken,
	unableToUpdateApForm,
	unableToUpdateForm,
	unableToUpdateMail,
	unableToUpdateSeason,
	unableToUpdateToken,
	usernameAlreadyTaken,
};
