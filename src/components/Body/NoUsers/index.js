import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { FaUserAltSlash } from "react-icons/fa";

const NoUsers = ({ className }) => (
	<div className={className}>
		<FaUserAltSlash /> <br />
		No Employees
	</div>
);

NoUsers.propTypes = {
	className: PropTypes.string.isRequired,
};

export default styled(NoUsers)`
	text-align: center;
	color: #bbb;
	padding: 10px 5px;
	font-size: 17px;
	width: 100%;
	margin-right: auto;
	margin-left: auto;
`;
