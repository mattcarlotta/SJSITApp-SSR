import React from "react";
import Head from "next/head";
import PropTypes from "prop-types";

const Header = ({ title }) => (
	<Head>
		<title>San Jose Sharks Ice Team - {title}</title>
	</Head>
);

Header.propTypes = {
	title: PropTypes.string,
};

export default Header;
