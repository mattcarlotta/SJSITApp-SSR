import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import { Card } from "antd";
import { connect } from "react-redux";
import Router from "next/router";
import { FaPaperPlane } from "react-icons/fa";
import Button from "~components/Body/Button";
import BackButton from "~components/Body/BackButton";
import EmailPreview from "~components/Body/EmailPreview";
import FormContainer from "~components/Body/FormContainer";
import FieldGenerator from "~components/Forms/FieldGenerator";
import FormTitle from "~components/Forms/FormTitle";
import LoadingForm from "~components/Forms/LoadingForm";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import parseFields from "~utils/parseFields";
import { fetchMemberNames } from "~actions/Members";
import { createMail } from "~actions/Mail";
import updateFormFields from "./UpdateFormFields";
import fields from "./Fields";

const title = "Send Mail";
const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 20,
};

export class SendMailForm extends Component {
	state = {
		fields,
		errors: "",
		isLoading: true,
		isSubmitting: false,
	};

	static getDerivedStateFromProps = ({ memberNames, serverMessage }, state) => {
		if (state.isLoading && !isEmpty(memberNames)) {
			return {
				fields: state.fields.map(field => updateFormFields(field, memberNames)),
				isLoading: false,
			};
		}

		if (serverMessage) return { isSubmitting: false, showPreview: false };

		return null;
	};

	componentDidMount = () => {
		this.props.fetchMemberNames();
	};

	handleChange = ({ target: { name, value } }) => {
		this.setState(prevState => ({
			...prevState,
			fields: fieldUpdater(prevState.fields, name, value),
		}));
	};

	handlePreview = () =>
		this.setState(prevState => ({ showPreview: !prevState.showPreview }));

	handleSubmit = e => {
		e.preventDefault();
		const { validatedFields, errors } = fieldValidator(this.state.fields);

		this.setState(
			{ fields: validatedFields, isSubmitting: !errors, showPreview: !errors },
			() => {
				if (!errors) this.props.createMail(parseFields(validatedFields));
			},
		);
	};

	render = () => (
		<Card
			extra={
				<BackButton
					push={Router.push}
					location="/employee/mail/viewall?page=1"
				/>
			}
			title={
				<>
					<FaPaperPlane style={iconStyle} />
					<span css="vertical-align: middle;">{title}</span>
				</>
			}
		>
			<FormContainer>
				<FormTitle
					header={title}
					title={title}
					description="Please fill out all of the form fields below."
				/>
				<form onSubmit={this.handleSubmit}>
					{this.state.isLoading ? (
						<LoadingForm rows={5} />
					) : (
						<>
							<FieldGenerator
								fields={this.state.fields}
								onChange={this.handleChange}
							/>
							<Button className="preview" primary onClick={this.handlePreview}>
								Preview
							</Button>
							{this.state.showPreview && (
								<EmailPreview
									fields={parseFields(this.state.fields)}
									isSubmitting={this.state.isSubmitting}
									handleCloseModal={this.handlePreview}
									submitTitle="Send"
								/>
							)}
						</>
					)}
				</form>
			</FormContainer>
		</Card>
	);
}

SendMailForm.propTypes = {
	createMail: PropTypes.func.isRequired,
	fetchMemberNames: PropTypes.func.isRequired,
	memberNames: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			email: PropTypes.string,
		}),
	),
	serverMessage: PropTypes.string,
};

const mapStateToProps = state => ({
	memberNames: state.members.names,
	serverMessage: state.server.message,
});

const mapDispatchToProps = {
	createMail,
	fetchMemberNames,
};

export default connect(mapStateToProps, mapDispatchToProps)(SendMailForm);
