import React, { Fragment } from "react";
import PropTypes from "prop-types";
import Head from "~components/Navigation/Head";
import Center from "~components/Body/Center";
import Title from "~components/Body/Title";
import Paragraph from "~components/Body/Paragraph";

const FormTitle = ({ description, header, title }) => (
	<Fragment>
		<Head title={header} />
		<Center style={{ borderBottom: "1px solid #e8edf2", marginBottom: "25px" }}>
			<Title style={{ color: "#025f6d" }}>{title}</Title>
			<Paragraph style={{ color: "#69727d" }}>{description}</Paragraph>
		</Center>
	</Fragment>
);

FormTitle.propTypes = {
	description: PropTypes.string.isRequired,
	header: PropTypes.string.isRequired,
	title: PropTypes.string.isRequired,
};

export default FormTitle;
