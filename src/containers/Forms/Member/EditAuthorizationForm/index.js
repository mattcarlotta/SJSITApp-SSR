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
import { updateMemberToken } from "~actions/Members";
import fields from "./Fields";
import updateFormFields from "./UpdateFormFields";

const title = "Edit Authorization";
const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 20,
};

export class EditAuthorizationForm extends Component {
	state = {
		fields,
		isLoading: true,
		isSubmitting: false,
	};

	static getDerivedStateFromProps = ({ editToken, serverMessage }, state) => {
		if (state.isLoading && !isEmpty(editToken)) {
			return {
				fields: state.fields.map(field => updateFormFields(field, editToken)),
				isLoading: false,
			};
		}

		if (serverMessage) return { isSubmitting: false };

		return null;
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
				editToken: { _id },
				updateMemberToken,
			} = this.props;

			if (!errors) {
				const parsedFields = parseFields(validatedFields);

				updateMemberToken({ _id, ...parsedFields });
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
					description="Select a different season, role, and/or enter another valid email address."
				/>
				<form onSubmit={this.handleSubmit}>
					{this.state.isLoading ? (
						<LoadingForm rows={2} />
					) : (
						<>
							<FieldGenerator
								fields={this.state.fields}
								onChange={this.handleChange}
							/>
							<SubmitButton
								title="Update Authorization"
								isSubmitting={this.state.isSubmitting}
							/>
						</>
					)}
				</form>
			</FormContainer>
		</Card>
	);
}

EditAuthorizationForm.propTypes = {
	editToken: PropTypes.shape({
		_id: PropTypes.string,
		authorizedEmail: PropTypes.string,
		role: PropTypes.string,
	}),
	serverMessage: PropTypes.string,
	updateMemberToken: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = ({ members, server }) => ({
	editToken: members.editToken,
	serverMessage: server.message,
});

/* istanbul ignore next */
const mapDispatchToProps = {
	updateMemberToken,
};

export default connect(
	mapStateToProps,
	mapDispatchToProps,
)(EditAuthorizationForm);
