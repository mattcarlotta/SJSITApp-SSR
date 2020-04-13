import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import { Card } from "antd";
import { connect } from "react-redux";
import Router from "next/router";
import { MdNoteAdd } from "react-icons/md";
import BackButton from "~components/Body/BackButton";
import FormContainer from "~components/Body/FormContainer";
import SubmitButton from "~components/Body/SubmitButton";
import FieldGenerator from "~components/Forms/FieldGenerator";
import FormTitle from "~components/Forms/FormTitle";
import LoadingForm from "~components/Forms/LoadingForm";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import parseFields from "~utils/parseFields";
import { createForm } from "~actions/Forms";
import fields from "./Fields";

const title = "New AP Form";
const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 22,
};

export class NewAPForm extends Component {
	state = {
		fields,
		isLoading: true,
		isSubmitting: false,
	};

	static getDerivedStateFromProps = ({ seasonIds, serverMessage }, state) => {
		if (state.isLoading && !isEmpty(seasonIds)) {
			return {
				fields: state.fields.map(field =>
					field.name === "seasonId"
						? { ...field, selectOptions: seasonIds, disabled: false }
						: { ...field, disabled: false },
				),
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
			if (!errors) this.props.createForm(parseFields(validatedFields));
		});
	};

	render = () => (
		<Card
			extra={
				<BackButton
					push={Router.push}
					location="/employee/forms/viewall?page=1"
				/>
			}
			title={
				<>
					<MdNoteAdd style={iconStyle} />
					<span css="vertical-align: middle;">{title}</span>
				</>
			}
		>
			<FormContainer>
				<FormTitle
					header={title}
					title={title}
					description="Please fill the fields below to create a new AP form."
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
								disabled={isEmpty(this.props.seasonIds)}
								title="Create Form"
								isSubmitting={this.state.isSubmitting}
							/>
						</>
					)}
				</form>
			</FormContainer>
		</Card>
	);
}

NewAPForm.propTypes = {
	createForm: PropTypes.func.isRequired,
	seasonIds: PropTypes.arrayOf(PropTypes.string),
	serverMessage: PropTypes.string,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
	serverMessage: state.server.message,
	seasonIds: state.seasons.ids,
});

/* istanbul ignore next */
const mapDispatchToProps = {
	createForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewAPForm);
