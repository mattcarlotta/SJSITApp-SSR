import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import { Card } from "antd";
import { connect } from "react-redux";
import Router from "next/router";
import { FaEdit } from "react-icons/fa";
import BackButton from "~components/Body/BackButton";
import FormContainer from "~components/Body/FormContainer";
import SubmitButton from "~components/Body/SubmitButton";
import FieldGenerator from "~components/Forms/FieldGenerator";
import FormTitle from "~components/Forms/FormTitle";
import LoadingForm from "~components/Forms/LoadingForm";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import parseFields from "~utils/parseFields";
import { fetchForm, updateForm } from "~actions/Forms";
import fields from "./Fields";
import updateFormFields from "./UpdateFormFields";

const title = "Edit Form";
const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 22,
};

export class EditForm extends Component {
	state = {
		fields,
		isLoading: true,
		isSubmitting: false,
	};

	static getDerivedStateFromProps = ({ editForm, serverMessage }, state) => {
		if (state.isLoading && !isEmpty(editForm)) {
			return {
				fields: state.fields.map(field => updateFormFields(field, editForm)),
				isLoading: false,
			};
		}

		if (serverMessage) return { isSubmitting: false };

		return null;
	};

	componentDidMount = () => {
		const { id } = this.props.match.params;
		this.props.fetchForm(id);
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
			const {
				editForm: { _id },
				updateForm,
			} = this.props;

			if (!errors) {
				const parsedFields = parseFields(validatedFields);
				updateForm({ _id, ...parsedFields });
			}
		});
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
					description="Edit or change any of the current form fields below."
				/>
				<form onSubmit={this.handleSubmit}>
					{this.state.isLoading ? (
						<LoadingForm rows={4} />
					) : (
						<>
							<FieldGenerator
								fields={this.state.fields}
								onChange={this.handleChange}
							/>
							<SubmitButton
								disabled={isEmpty(this.props.editForm)}
								title="Update Form"
								isSubmitting={this.state.isSubmitting}
							/>
						</>
					)}
				</form>
			</FormContainer>
		</Card>
	);
}

EditForm.propTypes = {
	editForm: PropTypes.shape({
		_id: PropTypes.string,
		startMonth: PropTypes.string,
		endMonth: PropTypes.string,
		expirationDate: PropTypes.string,
		sendEmailNotificationsDate: PropTypes.string,
		notes: PropTypes.string,
	}),
	fetchForm: PropTypes.func.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string,
		}),
	}).isRequired,
	serverMessage: PropTypes.string,
	updateForm: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	editForm: state.forms.editForm,
	serverMessage: state.server.message,
});

const mapDispatchToProps = {
	fetchForm,
	updateForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditForm);
