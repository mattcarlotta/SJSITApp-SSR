import React, { Component } from "react";
import PropTypes from "prop-types";
import { Card } from "antd";
import { connect } from "react-redux";
import { FaConciergeBell } from "react-icons/fa";
import FormContainer from "~components/Body/FormContainer";
import SubmitButton from "~components/Body/SubmitButton";
import FieldGenerator from "~components/Forms/FieldGenerator";
import FormTitle from "~components/Forms/FormTitle";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import parseFields from "~utils/parseFields";
import { contactUs } from "~actions/Mail";
import fields from "./Fields";

const title = "Contact Us";
const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 20,
};

export class ContactForm extends Component {
	state = {
		fields,
		isLoading: true,
		isSubmitting: false,
	};

	static getDerivedStateFromProps = ({ serverMessage }) => {
		return serverMessage ? { isSubmitting: false } : null;
	};

	handleChange = ({ target: { name, value } }) => {
		this.setState(prevState => ({
			...prevState,
			fields: fieldUpdater(prevState.fields, name, value),
		}));
	};

	handleSubmit = e => {
		e.preventDefault();
		const { validatedFields, errors } = fieldValidator(this.state.fields);

		this.setState({ fields: validatedFields, isSubmitting: !errors }, () => {
			if (!errors) this.props.contactUs(parseFields(validatedFields));
		});
	};

	render = () => (
		<Card
			title={
				<>
					<FaConciergeBell style={iconStyle} />
					<span css="vertical-align: middle;">{title}</span>
				</>
			}
		>
			<FormContainer>
				<FormTitle
					header={title}
					title={title}
					description="Please fill out the fields below to send us a message."
				/>
				<form onSubmit={this.handleSubmit}>
					<FieldGenerator
						fields={this.state.fields}
						onChange={this.handleChange}
					/>
					<SubmitButton
						title="Send Message"
						isSubmitting={this.state.isSubmitting}
					/>
					<p css="font-size: 15px;">
						By clicking the &#34;Send Message&#34; button, you agree to allow us
						to use your email address as a &#34;Sent From&#34; addresser -- an
						email, with the subject and message supplied above, will be
						generated and sent to one or many of the &#34;Send To&#34; addresses
						associated with the Ice Team.
					</p>
				</form>
			</FormContainer>
		</Card>
	);
}

ContactForm.propTypes = {
	contactUs: PropTypes.func.isRequired,
	serverMessage: PropTypes.string,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
	serverMessage: state.server.message,
});

/* istanbul ignore next */
const mapDispatchToProps = {
	contactUs,
};

export default connect(mapStateToProps, mapDispatchToProps)(ContactForm);
