import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import { Card } from "antd";
import { connect } from "react-redux";
import Router, { withRouter } from "next/router";
import { FaEdit } from "react-icons/fa";
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
import { updateMail } from "~actions/Mail";
import updateFormFields from "./UpdateFormFields";
import fields from "./Fields";

const title = "Edit Mail";
const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 20,
};

export class EditMailForm extends Component {
	constructor(props) {
		super(props);

		const { id } = props.router.query;

		this.state = {
			id,
			fields,
			errors: "",
			isLoading: true,
			isSubmitting: false,
		};
	}

	static getDerivedStateFromProps = ({ editMail, serverMessage }, state) => {
		if (state.isLoading && !isEmpty(editMail)) {
			return {
				fields: state.fields.map(field => updateFormFields(field, editMail)),
				isLoading: false,
			};
		}

		if (serverMessage) return { isSubmitting: false, showPreview: false };

		return null;
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
				if (!errors)
					this.props.updateMail({
						...parseFields(validatedFields),
						_id: this.state.id,
					});
			},
		);
	};

	render = () => (
		<Card
			extra={<BackButton push={Router.back} />}
			title={
				<>
					<FaEdit style={iconStyle} />
					<span css="vertical-align: middle;">{title}</span>
				</>
			}
		>
			<FormContainer>
				<FormTitle
					header={title}
					title={title}
					description="Edit and update the email below."
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
									submitTitle="Update"
								/>
							)}
						</>
					)}
				</form>
			</FormContainer>
		</Card>
	);
}

EditMailForm.propTypes = {
	editMail: PropTypes.shape({
		dataSource: PropTypes.arrayOf(
			PropTypes.shape({
				_id: PropTypes.string,
				email: PropTypes.string,
			}),
		),
		sendFrom: PropTypes.string,
		message: PropTypes.string,
		sendTo: PropTypes.arrayOf(PropTypes.string),
	}),
	router: PropTypes.shape({
		query: PropTypes.shape({
			id: PropTypes.string,
		}),
	}).isRequired,
	serverMessage: PropTypes.string,
	updateMail: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	editMail: state.mail.editMail,
	serverMessage: state.server.message,
});

const mapDispatchToProps = {
	updateMail,
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(EditMailForm),
);
