/* eslint-disable no-console */
import "~env";
import "~models/all";
import { connectDatabase } from "~database";
import { Event, Form, Mail, User, Season, Team, Token } from "~models";
import {
	createDate,
	createSchedule,
	createSignupToken,
	createRandomToken,
	expirationDate,
} from "~utils/helpers";
import moment from "~utils/momentWithTZ";
import teams from "./Teams";

const { SEED } = process.env;

const admin = {
	email: "carlotta.matt@gmail.com",
	firstName: "Matt",
	lastName: "Carlotta",
	password: "password",
};

/**
 * Function to seed the testing Mongo database.
 *
 * @function
 * @async
 * @returns {string} - displays a:  PASS  utils/seedDB.js message to console.
 * @throws {error} - displays a:  FAIL  utils/seedDB.js message to console with the error.
 */
const seedDB = async () => {
	const db = connectDatabase();
	try {
		const databaseExists = User.findOne({ email: admin.email });
		if (databaseExists) await db.dropDatabase();

		const newSeason = {
			seasonId: "20002001",
			startDate: new Date(2000, 8, 26),
			endDate: new Date(2001, 5, 12),
		};

		const newSeason2 = {
			seasonId: "20052006",
			startDate: new Date(2005, 8, 26),
			endDate: new Date(2006, 5, 12),
		};

		const newSeason3 = {
			seasonId: "20112012",
			startDate: new Date(2011, 8, 26),
			endDate: new Date(2012, 5, 12),
		};

		const newSeason4 = {
			seasonId: "20192020",
			startDate: new Date(2019, 8, 26),
			endDate: new Date(2020, 5, 12),
		};

		const newSeason5 = {
			seasonId: "19801981",
			startDate: new Date(1980, 8, 26),
			endDate: new Date(1981, 5, 12),
		};

		await Season.insertMany([
			newSeason,
			newSeason2,
			newSeason3,
			newSeason4,
			newSeason5,
		]);

		const newHire = {
			authorizedEmail: "carlotta.matt@gmail.com",
			email: "carlotta.matt@gmail.com",
			role: "admin",
			token: createSignupToken(),
			expiration: expirationDate().toDate(),
		};

		const newHire1 = {
			authorizedEmail: "member@example.com",
			email: "member@example.com",
			role: "employee",
			token: createSignupToken(),
			expiration: expirationDate().toDate(),
		};

		const newHire2 = {
			authorizedEmail: "member55@example.com",
			role: "employee",
			token: createSignupToken(),
			expiration: expirationDate().toDate(),
		};

		const newHire3 = {
			authorizedEmail: "member66@example.com",
			role: "employee",
			token: createSignupToken(),
			expiration: expirationDate().toDate(),
		};

		const newHire4 = {
			authorizedEmail: "member667@example.com",
			role: "employee",
			token: createSignupToken(),
			expiration: expirationDate().toDate(),
		};

		const newHire5 = {
			authorizedEmail: "member77@example.com",
			role: "employee",
			token: createSignupToken(),
			expiration: expirationDate().toDate(),
		};

		const newHire6 = {
			authorizedEmail: "member888@example.com",
			role: "employee",
			token: createSignupToken(),
			expiration: expirationDate().toDate(),
		};

		const newHire7 = {
			authorizedEmail: "member999@example.com",
			role: "employee",
			token: createSignupToken(),
			expiration: expirationDate().toDate(),
		};

		const newHire8 = {
			authorizedEmail: "member1000@example.com",
			role: "employee",
			token: createSignupToken(),
			expiration: expirationDate().toDate(),
		};

		const newHire9 = {
			authorizedEmail: "member1001@example.com",
			role: "employee",
			token: createSignupToken(),
			expiration: expirationDate().toDate(),
		};

		const newHire10 = {
			authorizedEmail: "member1002@example.com",
			role: "employee",
			token: createSignupToken(),
			expiration: expirationDate().toDate(),
		};

		const newHire11 = {
			authorizedEmail: "csusi@sapcenter.com",
			email: "csusi@sapcenter.com",
			role: "staff",
			token: createSignupToken(),
			expiration: expirationDate().toDate(),
		};

		const newHire12 = {
			authorizedEmail: "deleteme@delete.com",
			email: "deleteme@delete.com",
			role: "employee",
			token: createSignupToken(),
			expiration: expirationDate().toDate(),
		};

		await Token.insertMany([
			newHire,
			newHire1,
			newHire2,
			newHire3,
			newHire4,
			newHire5,
			newHire6,
			newHire7,
			newHire8,
			newHire9,
			newHire10,
			newHire11,
			newHire12,
		]);

		const registered = createDate().toDate();

		const adminPassword = await User.createPassword(admin.password);

		const administrator = {
			...admin,
			password: adminPassword,
			role: "admin",
			token: createRandomToken(),
			emailReminders: true,
			registered,
		};

		const memberPassword = await User.createPassword(admin.password);

		const staffMember = {
			email: "staffmember@example.com",
			password: memberPassword,
			firstName: "Staff",
			lastName: "Member",
			role: "staff",
			token: createRandomToken(),
			emailReminders: true,
			registered,
		};

		const realMember = {
			email: "carlotta.matthew@gmail.com",
			password: memberPassword,
			firstName: "Matthew",
			lastName: "Carlotta",
			role: "employee",
			token: createRandomToken(),
			emailReminders: true,
			registered,
		};

		const scheduledMember = {
			email: "scheduledmember@test.com",
			password: memberPassword,
			firstName: "Scheduled",
			lastName: "Member",
			role: "employee",
			token: createRandomToken(),
			emailReminders: true,
			registered,
		};

		const member = {
			email: "member@example.com",
			password: memberPassword,
			firstName: "Member",
			lastName: "Member",
			role: "employee",
			token: createRandomToken(),
			emailReminders: true,
			registered,
		};

		const member2 = {
			email: "member2@example.com",
			password: memberPassword,
			firstName: "Member2",
			lastName: "Member2",
			role: "employee",
			token: createRandomToken(),
			emailReminders: true,
			registered,
		};

		const member3 = {
			email: "member3@example.com",
			password: memberPassword,
			firstName: "Member3",
			lastName: "Member3",
			role: "employee",
			token: createRandomToken(),
			emailReminders: true,
			registered,
		};

		const member4 = {
			email: "member4@example.com",
			password: memberPassword,
			firstName: "Member4",
			lastName: "Member4",
			role: "employee",
			token: createRandomToken(),
			emailReminders: true,
			registered,
			status: "suspended",
		};

		const member5 = {
			email: "member5@example.com",
			password: memberPassword,
			firstName: "Member5",
			lastName: "Member5",
			role: "employee",
			token: createRandomToken(),
			emailReminders: true,
			registered,
			status: "suspended",
		};

		const member6 = {
			email: "member6@example.com",
			password: memberPassword,
			firstName: "Member6",
			lastName: "Member6",
			role: "employee",
			token: createRandomToken(),
			emailReminders: true,
			registered,
			status: "active",
		};

		const member7 = {
			email: "member7@example.com",
			password: memberPassword,
			firstName: "Member7",
			lastName: "Member7",
			role: "employee",
			token: createRandomToken(),
			emailReminders: true,
			registered,
			status: "active",
		};

		const member8 = {
			email: "member8@example.com",
			password: memberPassword,
			firstName: "Member8",
			lastName: "Member8",
			role: "employee",
			token: createRandomToken(),
			emailReminders: true,
			registered,
			status: "active",
		};

		const member9 = {
			email: "member9@example.com",
			password: memberPassword,
			firstName: "Member9",
			lastName: "Member9",
			role: "employee",
			token: createRandomToken(),
			emailReminders: true,
			registered,
			status: "active",
		};

		const member299 = {
			email: "member299@example.com",
			password: memberPassword,
			firstName: "Member299",
			lastName: "Member299",
			role: "employee",
			token: createRandomToken(),
			emailReminders: true,
			registered,
			status: "active",
		};

		const member399 = {
			email: "member399@example.com",
			password: memberPassword,
			firstName: "Member399",
			lastName: "Member399",
			role: "employee",
			token: createRandomToken(),
			emailReminders: true,
			registered,
			status: "active",
		};

		const member499 = {
			email: "member499@example.com",
			password: memberPassword,
			firstName: "Member499",
			lastName: "Member499",
			role: "employee",
			token: createRandomToken(),
			emailReminders: true,
			registered,
			status: "active",
		};

		const suspendedEmployee = {
			email: "suspended.employee@example.com",
			password: memberPassword,
			firstName: "Suspended",
			lastName: "Employee",
			role: "employee",
			token: createRandomToken(),
			emailReminders: true,
			registered,
			status: "suspended",
		};

		const deletedEmployee = {
			email: "deleted.employee@delete.com",
			password: memberPassword,
			firstName: "Delete",
			lastName: "Me",
			role: "employee",
			token: createRandomToken(),
			emailReminders: true,
			registered,
			status: "active",
		};

		const turnedOffReminders = {
			email: "turned.off@reminders.com",
			password: memberPassword,
			firstName: "Turned Off",
			lastName: "Reminders",
			role: "employee",
			token: createRandomToken(),
			emailReminders: false,
			registered,
			status: "active",
		};

		await User.insertMany([
			administrator,
			realMember,
			staffMember,
			scheduledMember,
			member,
			member2,
			member3,
			member4,
			member5,
			member6,
			member7,
			member8,
			member9,
			member299,
			member399,
			member499,
			suspendedEmployee,
			deletedEmployee,
			turnedOffReminders,
		]);

		const scheduledUser = await User.findOne({ email: scheduledMember.email });

		const newEventCallTimes = [
			"2019-08-09T17:45:26-07:00",
			"2019-08-09T18:15:26-07:00",
			"2019-08-09T18:30:26-07:00",
			"2019-08-09T19:00:26-07:00",
		];

		const newEvent = {
			team: "San Jose Sharks",
			opponent: "Winnipeg Jets",
			eventType: "Game",
			location: "Test Location",
			callTimes: newEventCallTimes,
			uniform: "Teal Jersey",
			seasonId: "20192020",
			eventDate: "2019-02-10T02:30:31.834Z",
			scheduledIds: [scheduledUser._id],
			schedule: [
				{
					_id: "2019-02-09T17:45:26-07:00",
					employeeIds: [scheduledUser._id],
				},
				{
					_id: "2019-02-09T18:15:26-07:00",
					employeeIds: [],
				},
				{
					_id: "2019-02-09T18:30:26-07:00",
					employeeIds: [],
				},
				{
					_id: "2019-02-09T19:00:26-07:00",
					employeeIds: [],
				},
			],
			sentEmailReminders: false,
			employeeResponses: [
				{
					_id: scheduledUser._id,
					notes: "",
					response: "I want to work.",
				},
			],
		};

		const gameTomorrow = {
			team: "San Jose Sharks",
			opponent: "Detroit Red Wings",
			eventType: "Game",
			location: "Test Location",
			callTimes: newEventCallTimes,
			uniform: "Teal Jersey",
			seasonId: "20192020",
			eventDate: moment().add(1, "day").format(),
			scheduledIds: [scheduledUser._id],
			schedule: [
				{
					_id: "2019-02-09T17:45:26-07:00",
					employeeIds: [scheduledUser._id],
				},
				{
					_id: "2019-02-09T18:15:26-07:00",
					employeeIds: [],
				},
				{
					_id: "2019-02-09T18:30:26-07:00",
					employeeIds: [],
				},
				{
					_id: "2019-02-09T19:00:26-07:00",
					employeeIds: [],
				},
			],
			sentEmailReminders: false,
			employeeResponses: [
				{
					_id: scheduledUser._id,
					notes: "",
					response: "I want to work.",
				},
			],
		};

		const newEventCallTimes2 = ["2019-08-09T19:00:38-07:00"];

		const newEvent2 = {
			team: "San Jose Barracuda",
			opponent: "San Diego Gulls",
			eventType: "Game",
			location: "SAP Center at San Jose",
			callTimes: newEventCallTimes2,
			uniform: "Barracuda Jacket",
			seasonId: "20192020",
			eventDate: "2019-08-11T02:30:30.036Z",
			schedule: createSchedule(newEventCallTimes2),
			sentEmailReminders: false,
		};

		const newEventCallTimes3 = [
			"2019-08-19T17:15:43-07:00",
			"2019-08-19T17:45:43-07:00",
			"2019-08-19T18:15:43-07:00",
			"2019-08-19T19:00:43-07:00",
		];

		const newEvent3 = {
			eventType: "Game",
			location: "SAP Center at San Jose",
			callTimes: newEventCallTimes3,
			uniform: "Sharks Teal Jersey",
			eventDate: "2019-08-21T02:30:36.000Z",
			notes: "",
			opponent: "Vegas Golden Knights",
			seasonId: "20192020",
			team: "San Jose Sharks",
			employeeResponses: [
				{
					_id: scheduledUser._id,
					response: "I want to work.",
					notes: "",
				},
			],
			schedule: createSchedule(newEventCallTimes3),
			sentEmailReminders: false,
		};

		const newEventCallTimes4 = [
			"2019-10-19T17:15:43-07:00",
			"2019-10-19T17:45:43-07:00",
			"2019-10-19T18:15:43-07:00",
			"2019-10-19T19:00:43-07:00",
		];

		const newEvent4 = {
			eventType: "Game",
			location: "SAP Center at San Jose",
			callTimes: newEventCallTimes4,
			uniform: "Sharks Teal Jersey",
			eventDate: "2019-10-21T02:30:36.000Z",
			notes: "",
			opponent: "Dallas Stars",
			seasonId: "20192020",
			team: "San Jose Sharks",
			employeeResponses: [
				{
					_id: scheduledUser._id,
					response: "I want to work.",
					notes: "",
				},
			],
			schedule: createSchedule(newEventCallTimes4),
			sentEmailReminders: false,
		};

		const newEventCallTimes5 = [
			"2019-10-31T17:15:43-07:00",
			"2019-10-31T17:45:43-07:00",
			"2019-10-31T18:15:43-07:00",
			"2019-10-31T19:00:43-07:00",
		];

		const newEvent5 = {
			eventType: "Game",
			location: "SAP Center at San Jose",
			callTimes: newEventCallTimes5,
			uniform: "Sharks Teal Jersey",
			eventDate: "2019-10-31T02:30:36.000Z",
			notes: "",
			opponent: "Arizona Coyotes",
			seasonId: "20192020",
			team: "San Jose Sharks",
			schedule: createSchedule(newEventCallTimes5),
			sentEmailReminders: false,
		};

		const newEventCallTimes6 = ["2019-09-06T16:00:00-07:00"];

		const newEvent6 = {
			eventType: "Game",
			location: "SAP Center at San Jose",
			callTimes: newEventCallTimes6,
			uniform: "Barracuda Jacket",
			eventDate: "2019-09-06T16:30:36.000Z",
			notes: "",
			opponent: "San Diego Gulls",
			seasonId: "20192020",
			team: "San Jose Barracuda",
			schedule: createSchedule(newEventCallTimes6),
			sentEmailReminders: false,
		};

		const newEventCallTimes7 = ["2019-09-07T16:00:00-07:00"];

		const newEvent7 = {
			eventType: "Game",
			location: "SAP Center at San Jose",
			callTimes: newEventCallTimes7,
			uniform: "Barracuda Jacket",
			eventDate: "2019-09-07T16:30:36.000Z",
			notes: "Star Wars night!",
			opponent: "San Diego Gulls",
			seasonId: "20192020",
			team: "San Jose Barracuda",
			schedule: createSchedule(newEventCallTimes7),
			sentEmailReminders: false,
		};

		const newEventCallTimes8 = ["2019-09-08T16:00:00-07:00"];

		const newEvent8 = {
			eventType: "Game",
			location: "SAP Center at San Jose",
			callTimes: newEventCallTimes8,
			uniform: "Barracuda Jacket",
			eventDate: "2019-09-08T16:30:36.000Z",
			notes: "Bring a dog!",
			opponent: "San Diego Gulls",
			seasonId: "20192020",
			team: "San Jose Barracuda",
			schedule: createSchedule(newEventCallTimes8),
			sentEmailReminders: false,
		};

		const newEventCallTimes9 = ["2019-10-08T16:00:00-07:00"];

		const newEvent9 = {
			eventType: "Game",
			location: "SAP Center at San Jose",
			callTimes: newEventCallTimes9,
			uniform: "Barracuda Jacket",
			eventDate: "2019-10-08T16:30:36.000Z",
			notes: "Star Wars Night!",
			opponent: "Charlotte Checkers",
			seasonId: "20192020",
			team: "San Jose Barracuda",
			schedule: createSchedule(newEventCallTimes9),
			sentEmailReminders: true,
		};

		const newEvent10 = {
			eventType: "Game",
			location: "SAP Center at San Jose",
			callTimes: newEventCallTimes9,
			uniform: "Barracuda Jacket",
			eventDate: "2019-07-08T16:30:36.000Z",
			notes: "Unscheduled game.",
			opponent: "Colorado Eagles",
			seasonId: "20192020",
			team: "San Jose Barracuda",
			schedule: createSchedule(newEventCallTimes9),
			sentEmailReminders: true,
		};

		const newEvent11 = {
			eventType: "Game",
			location: "SAP Center at San Jose",
			callTimes: newEventCallTimes9,
			uniform: "Barracuda Jacket",
			eventDate: moment().format(),
			notes: "Unscheduled game.",
			opponent: "Chicago Wolves",
			seasonId: "20192020",
			team: "San Jose Barracuda",
			schedule: createSchedule(newEventCallTimes9),
			scheduledIds: [scheduledUser._id],
			sentEmailReminders: true,
			employeeResponses: [
				{
					_id: scheduledUser._id,
					response: "I want to work.",
					notes: "",
				},
			],
		};

		const newEvent12 = {
			eventType: "Game",
			location: "SAP Center at San Jose",
			callTimes: newEventCallTimes9,
			uniform: "Barracuda Jacket",
			eventDate: moment().add(1, "months").format(),
			notes: "Unscheduled game.",
			opponent: "Chicago Wolves",
			seasonId: "20192020",
			team: "San Jose Barracuda",
			schedule: createSchedule(newEventCallTimes9),
			scheduledIds: [scheduledUser._id],
			sentEmailReminders: true,
			employeeResponses: [
				{
					_id: scheduledUser._id,
					response: "I want to work.",
					notes: "",
				},
			],
		};

		const newEvent13 = {
			eventType: "Game",
			location: "SAP Center at San Jose",
			callTimes: newEventCallTimes9,
			uniform: "Barracuda Jacket",
			eventDate: moment().add(1, "months").format(),
			notes: "Delete this game.",
			opponent: "Chicago Wolves",
			seasonId: "20192020",
			team: "San Jose Barracuda",
			schedule: createSchedule(newEventCallTimes9),
			scheduledIds: [scheduledUser._id],
			sentEmailReminders: true,
			employeeResponses: [
				{
					_id: scheduledUser._id,
					response: "I want to work.",
					notes: "",
				},
			],
		};

		const autoDeletedEvent = {
			eventType: "Game",
			location: "SAP Center at San Jose",
			callTimes: newEventCallTimes9,
			uniform: "Barracuda Jacket",
			eventDate: moment().add(1, "months").format(),
			notes: "Auto deleted event.",
			opponent: "Chicago Wolves",
			seasonId: "19801981",
			team: "San Jose Barracuda",
			schedule: createSchedule(newEventCallTimes9),
			scheduledIds: [scheduledUser._id],
			sentEmailReminders: true,
			employeeResponses: [
				{
					_id: scheduledUser._id,
					response: "I want to work.",
					notes: "",
				},
			],
		};

		await Event.insertMany([
			newEvent,
			gameTomorrow,
			newEvent2,
			newEvent3,
			newEvent4,
			newEvent5,
			newEvent6,
			newEvent7,
			newEvent8,
			newEvent9,
			newEvent10,
			newEvent11,
			newEvent12,
			newEvent13,
			autoDeletedEvent,
		]);

		await Team.insertMany(teams);

		const form1 = {
			expirationDate: new Date("2000-08-10T07:00:00.000Z"),
			startMonth: new Date("2000-08-01T07:00:00.000Z"),
			endMonth: new Date("2000-08-31T07:00:00.000Z"),
			notes: "Form 1",
			seasonId: "20002001",
			sendEmailNotificationsDate: new Date("2000-08-31T07:00:00.000Z"),
			sentEmails: false,
		};

		const form2 = {
			expirationDate: new Date("2005-08-10T07:00:00.000Z"),
			startMonth: new Date("2005-08-01T07:00:00.000Z"),
			endMonth: new Date("2005-08-31T07:00:00.000Z"),
			notes: "Form 2",
			seasonId: "20052006",
			sendEmailNotificationsDate: new Date("2005-08-31T07:00:00.000Z"),
			sentEmails: false,
		};

		const form3 = {
			expirationDate: new Date("2011-08-10T07:00:00.000Z"),
			startMonth: new Date("2011-08-01T07:00:00.000Z"),
			endMonth: new Date("2011-08-31T07:00:00.000Z"),
			notes: "Form 3",
			seasonId: "20112012",
			sendEmailNotificationsDate: new Date("2011-08-31T07:00:00.000Z"),
			sentEmails: false,
		};

		const form4 = {
			expirationDate: new Date("2099-08-10T07:00:00.000Z"),
			startMonth: new Date("2019-08-01T07:00:00.000Z"),
			endMonth: new Date("2019-08-31T07:00:00.000Z"),
			notes: "Form 4",
			seasonId: "20192020",
			sendEmailNotificationsDate: new Date("2019-08-31T07:00:00.000Z"),
			sentEmails: false,
		};

		const form5 = {
			expirationDate: new Date("2099-08-10T07:00:00.000Z"),
			startMonth: new Date("2019-09-01T07:00:00.000Z"),
			endMonth: new Date("2019-09-30T07:00:00.000Z"),
			notes: "Form 5",
			seasonId: "20192020",
			sendEmailNotificationsDate: new Date("2019-09-31T07:00:00.000Z"),
			sentEmails: false,
		};

		const form6 = {
			expirationDate: new Date("2099-08-10T07:00:00.000Z"),
			startMonth: new Date("2019-10-01T07:00:00.000Z"),
			endMonth: new Date("2019-10-31T07:00:00.000Z"),
			notes: "Form 6",
			seasonId: "20192020",
			sendEmailNotificationsDate: new Date("2019-10-31T07:00:00.000Z"),
			sentEmails: false,
		};

		const form7 = {
			expirationDate: new Date("2099-08-10T07:00:00.000Z"),
			startMonth: new Date("2019-11-01T07:00:00.000Z"),
			endMonth: new Date("2019-11-31T07:00:00.000Z"),
			notes: "Form 7",
			seasonId: "20192020",
			sendEmailNotificationsDate: new Date("2019-11-31T07:00:00.000Z"),
			sentEmails: true,
		};

		const form8 = {
			expirationDate: new Date("2099-08-10T07:00:00.000Z"),
			startMonth: moment().startOf("month").format(),
			endMonth: moment().endOf("month").format(),
			notes: "Todays Form",
			seasonId: "20192020",
			sendEmailNotificationsDate: new Date("2099-11-31T07:00:00.000Z"),
			sentEmails: true,
		};

		const form9 = {
			expirationDate: new Date("2099-08-10T07:00:00.000Z"),
			startMonth: moment().add(1, "months").startOf("month").format(),
			endMonth: moment().add(1, "months").endOf("month").format(),
			notes: "Next Months Form",
			seasonId: "20192020",
			sendEmailNotificationsDate: new Date("2099-11-31T07:00:00.000Z"),
			sentEmails: true,
		};

		const form10 = {
			expirationDate: new Date("2099-08-10T07:00:00.000Z"),
			startMonth: new Date("2019-11-01T07:00:00.000Z"),
			endMonth: new Date("2019-11-31T07:00:00.000Z"),
			notes: "Delete this form.",
			seasonId: "20192020",
			sendEmailNotificationsDate: new Date("2019-11-31T07:00:00.000Z"),
			sentEmails: true,
		};

		const autoDeletedForm = {
			expirationDate: new Date("2099-08-10T07:00:00.000Z"),
			startMonth: new Date("2019-11-01T07:00:00.000Z"),
			endMonth: new Date("2019-11-31T07:00:00.000Z"),
			notes: "Auto deleted form.",
			seasonId: "19801981",
			sendEmailNotificationsDate: new Date("2019-11-31T07:00:00.000Z"),
			sentEmails: true,
		};

		await Form.insertMany([
			form1,
			form2,
			form3,
			form4,
			form5,
			form6,
			form7,
			form8,
			form9,
			form10,
			autoDeletedForm,
		]);

		const newMail = {
			sendTo: ["test@test.com"],
			sendFrom: "test@test.com",
			sendDate: "2000-10-06T07:00:00.000+00:00",
			message: "<span>Test</span>",
			status: "unsent",
			subject: "Test",
		};

		const newMail2 = {
			sendTo: ["test@test.com"],
			sendFrom: "test@test.com",
			sendDate: "2000-10-06T07:00:00.000+00:00",
			message: "<span>Test 2</span>",
			status: "sent",
			subject: "Test 2",
		};

		const newMail3 = {
			sendTo: ["test@test.com"],
			sendFrom: "test@test.com",
			sendDate: "2000-10-06T07:00:00.000+00:00",
			message: "<span>Test 3</span>",
			status: "unsent",
			subject: "Test 3",
		};

		const newMail4 = {
			sendTo: ["test@test.com"],
			sendFrom: "test@test.com",
			sendDate: "2099-10-06T07:00:00.000+00:00",
			message: "<span>Test 88</span>",
			status: "unsent",
			subject: "Test 88",
		};

		const newMail5 = {
			sendTo: ["test@test.com"],
			sendFrom: "test@test.com",
			sendDate: "2011-10-06T07:00:00.000+00:00",
			message: "<span>Test 1199</span>",
			status: "sent",
			subject: "Test 1199",
		};

		const newMail6 = {
			sendTo: ["test@test.com"],
			sendFrom: "test@test.com",
			sendDate: "2011-10-06T07:00:00.000+00:00",
			message: "<span>Delete this mail.</span>",
			status: "sent",
			subject: "Test 1199",
		};

		await Mail.insertMany([
			newMail,
			newMail2,
			newMail3,
			newMail4,
			newMail5,
			newMail6,
		]);

		await db.close();

		return console.log(
			"\n\x1b[7m\x1b[32;1m PASS \x1b[0m \x1b[2mutils/\x1b[0m\x1b[1mseedDB.js",
		);
	} catch (err) {
		return console.log(
			`\n\x1b[7m\x1b[31;1m FAIL \x1b[0m \x1b[2mutils/\x1b[0m\x1b[31;1mseedDB.js\x1b[0m\x1b[31m\n${err.toString()}\x1b[0m`,
		);
	} finally {
		if (SEED) {
			process.exit(0);
		}
	}
};

if (SEED) seedDB();

export default seedDB;
/* eslint-enable no-console */
