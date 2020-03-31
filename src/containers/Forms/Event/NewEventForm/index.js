import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import { Card } from "antd";
import { connect } from "react-redux";
import Router from "next/router";
import { FaCalendarPlus } from "react-icons/fa";
import BackButton from "~components/Body/BackButton";
import SubmitButton from "~components/Body/SubmitButton";
import FormContainer from "~components/Body/FormContainer";
import AddField from "~components/Forms/AddField";
import FieldGenerator from "~components/Forms/FieldGenerator";
import FormTitle from "~components/Forms/FormTitle";
import LoadingForm from "~components/Forms/LoadingForm";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import parseFields from "~utils/parseFields";
import { createEvent } from "~actions/Events";
import updateFormFields from "./UpdateFormFields";
import fields from "./Fields";

const title = "New Event";
const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 18,
};

export class NewEventForm extends Component {
	state = {
		fields,
		isLoading: true,
		isSubmitting: false,
	};

	static getDerivedStateFromProps = ({ newEvent, serverMessage }, state) => {
		if (state.isLoading && !isEmpty(newEvent)) {
			return {
				fields: state.fields.map(field => updateFormFields(field, newEvent)),
				isLoading: false,
			};
		}

		if (serverMessage) return { isSubmitting: false };

		return null;
	};

	handleAddField = () => {
		this.setState(prevState => ({
			...prevState,
			fields: [
				...prevState.fields,
				{
					type: "time",
					name: `callTime-${Date.now()}`,
					placeholder: "Select a call time...",
					label: "",
					value: null,
					errors: "",
					height: "auto",
					style: { width: "100%" },
					onFieldRemove: this.handleRemoveField,
				},
			],
		}));
	};

	handleRemoveField = name => {
		this.setState(prevState => ({
			...prevState,
			fields: prevState.fields.filter(field => field.name !== name),
		}));
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
			if (!errors) this.props.createEvent(parseFields(validatedFields));
		});
	};

	render = () => (
		<Card
			extra={
				<BackButton
					push={Router.push}
					location="/employee/events/viewall?page=1"
				/>
			}
			title={
				<>
					<FaCalendarPlus style={iconStyle} />
					<span css="vertical-align: middle;">{title}</span>
				</>
			}
		>
			<FormContainer>
				<FormTitle
					header={title}
					title={title}
					description="Please fill out all of the event fields below."
				/>
				<form onSubmit={this.handleSubmit}>
					{this.state.isLoading ? (
						<LoadingForm rows={9} />
					) : (
						<>
							<FieldGenerator
								fields={this.state.fields}
								onChange={this.handleChange}
							/>
							<AddField
								onClick={this.handleAddField}
								text="Add Call Time Slot"
							/>
							<SubmitButton
								disabled={isEmpty(this.props.newEvent)}
								title="Create Event"
								isSubmitting={this.state.isSubmitting}
							/>
						</>
					)}
				</form>
			</FormContainer>
		</Card>
	);
}

NewEventForm.propTypes = {
	createEvent: PropTypes.func.isRequired,
	newEvent: PropTypes.shape({
		seasonIds: PropTypes.arrayOf(PropTypes.string),
		teams: PropTypes.arrayOf(PropTypes.string),
	}),
	serverMessage: PropTypes.string,
};

const mapStateToProps = ({ events, server }) => ({
	newEvent: events.newEvent,
	serverMessage: server.message,
});

const mapDispatchToProps = {
	createEvent,
};

export default connect(mapStateToProps, mapDispatchToProps)(NewEventForm);
