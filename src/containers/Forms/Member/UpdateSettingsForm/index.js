import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import { connect } from "react-redux";
import SubmitButton from "~components/Body/SubmitButton";
import FieldGenerator from "~components/Forms/FieldGenerator";
import LoadingForm from "~components/Forms/LoadingForm";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import parseFields from "~utils/parseFields";
import { updateSettings } from "~actions/Members";
import fields from "./Fields";

export class UpdateSettingsForm extends Component {
	state = {
		fields,
		isLoading: true,
		isSubmitting: false,
	};

	static getDerivedStateFromProps = ({ viewMember, serverMessage }, state) => {
		if (state.isLoading && !isEmpty(viewMember)) {
			return {
				fields: state.fields.map(field => ({
					...field,
					value: viewMember[field.name],
				})),
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
			if (!errors) {
				this.props.updateSettings(parseFields(validatedFields));
			}
		});
	};

	render = () => (
		<form className="update-settings" onSubmit={this.handleSubmit}>
			{this.state.isLoading ? (
				<LoadingForm rows={3} />
			) : (
				<Fragment>
					<FieldGenerator
						fields={this.state.fields}
						onChange={this.handleChange}
					/>
					<SubmitButton
						title="Update Settings"
						isSubmitting={this.state.isSubmitting}
					/>
				</Fragment>
			)}
		</form>
	);
}

UpdateSettingsForm.propTypes = {
	serverMessage: PropTypes.string,
	updateSettings: PropTypes.func.isRequired,
	viewMember: PropTypes.shape({
		_id: PropTypes.string,
		email: PropTypes.string,
		emailReminders: PropTypes.bool,
		events: PropTypes.any,
		firstName: PropTypes.string,
		lastName: PropTypes.string,
		registered: PropTypes.string,
		role: PropTypes.string,
		schedule: PropTypes.any,
		status: PropTypes.string,
	}).isRequired,
};

/* istanbul ignore next */
const mapStateToProps = state => ({
	serverMessage: state.server.message,
	viewMember: state.members.viewMember,
});

/* istanbul ignore next */
const mapDispatchToProps = {
	updateSettings,
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateSettingsForm);
