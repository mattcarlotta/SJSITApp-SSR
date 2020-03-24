/* istanbul ignore file */
import React from "react";
import {
	FaBalanceScale,
	FaCalendar,
	FaCalendarPlus,
	FaCopyright,
	FaFileSignature,
	FaCogs,
	FaUsers,
	FaEnvelope,
	FaMailBulk,
	FaPaperPlane,
	FaQuestionCircle,
	FaConciergeBell,
	FaUserPlus,
	FaUserFriends,
	FaFileAlt,
	FaKey,
	FaFolder,
	FaFolderOpen,
	FaFolderPlus,
} from "react-icons/fa";
import { MdEvent, MdNoteAdd, MdEventNote, MdDashboard } from "react-icons/md";

export const StaffRoutes = [
	{
		icon: <MdDashboard />,
		key: "dashboard",
		value: "dashboard",
		tab: "dashboard",
	},
	{
		icon: <MdEvent />,
		key: "events",
		tab: "events",
		submenu: [
			{
				key: "events/create",
				value: "events/create",
				icon: <FaCalendarPlus />,
				tab: "Create Event",
			},
			{
				key: "events/viewall",
				value: "events/viewall?page=1",
				icon: <MdEventNote />,
				tab: "View Events",
			},
		],
	},
	{
		icon: <FaFileSignature />,
		key: "forms",
		tab: "forms",
		submenu: [
			{
				key: "forms/create",
				value: "forms/create",
				icon: <MdNoteAdd />,
				tab: "Create Form",
			},
			{
				key: "forms/viewall",
				value: "forms/viewall?page=1",
				icon: <FaFileAlt />,
				tab: "View Forms",
			},
		],
	},
	{
		icon: <FaEnvelope />,
		key: "mail",
		tab: "mail",
		submenu: [
			{
				key: "mail/create",
				value: "mail/create",
				icon: <FaPaperPlane />,
				tab: "Send Mail",
			},
			{
				key: "mail/viewall",
				value: "mail/viewall?page=1",
				icon: <FaMailBulk />,
				tab: "View Mail",
			},
		],
	},
	{
		icon: <FaUserFriends />,
		key: "members",
		tab: "members",
		submenu: [
			{
				key: "members/create",
				value: "members/create",
				icon: <FaUserPlus />,
				tab: "Create Member",
			},
			{
				key: "members/authorizations/viewall",
				value: "members/authorizations/viewall?page=1",
				icon: <FaKey />,
				tab: "View Authorizations",
			},
			{
				key: "members/viewall",
				value: "members/viewall?page=1",
				icon: <FaUsers />,
				tab: "View Members",
			},
		],
	},
	{
		icon: <FaCalendar />,
		key: "schedule",
		tab: "schedule",
	},
	{
		icon: <FaFolder />,
		key: "seasons",
		tab: "seasons",
		submenu: [
			{
				key: "seasons/create",
				value: "seasons/create",
				icon: <FaFolderPlus />,
				tab: "Create Season",
			},
			{
				key: "seasons/viewall",
				value: "seasons/viewall?page=1",
				icon: <FaFolderOpen />,
				tab: "View Seasons",
			},
		],
	},
	{ divider: true, key: "accounting" },
	{ icon: <FaCogs />, key: "settings", value: "settings", tab: "settings" },
	{ icon: <FaQuestionCircle />, key: "help", value: "help", tab: "help" },
	{
		icon: <FaConciergeBell />,
		key: "contact-us",
		value: "contact-us",
		tab: "contact us",
	},
	{
		icon: <FaBalanceScale />,
		key: "privacy",
		value: "privacy",
		tab: "privacy policy",
	},
	{
		icon: <FaCopyright />,
		key: "licensing",
		value: "licensing",
		tab: "licensing",
	},
];

export const EmployeeRoutes = [
	{ icon: <MdDashboard />, key: "dashboard", tab: "dashboard" },
	{
		icon: <FaCalendar />,
		key: "schedule",
		tab: "schedule",
	},
	{ divider: true, key: "accounting" },
	{ icon: <FaCogs />, key: "settings", tab: "settings" },
	{ icon: <FaQuestionCircle />, key: "help", tab: "help" },
	{ icon: <FaConciergeBell />, key: "contact-us", tab: "contact us" },
	{ icon: <FaBalanceScale />, key: "privacy", tab: "privacy policy" },
	{ icon: <FaCopyright />, key: "licensing", tab: "licensing" },
];
