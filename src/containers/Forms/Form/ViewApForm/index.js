import React, { Component } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import moment from "moment";
import { Card } from "antd";
import { connect } from "react-redux";
import Router from "next/router";
import { FaFileSignature } from "react-icons/fa";
import BackButton from "~components/Body/BackButton";
import FormContainer from "~components/Body/FormContainer";
import LoadingPanel from "~components/Body/LoadingPanel";
import Notes from "~components/Body/Notes";
import SubmitButton from "~components/Body/SubmitButton";
import Title from "~components/Body/Title";
import FieldGenerator from "~components/Forms/FieldGenerator";
import FormTitle from "~components/Forms/FormTitle";
import LoadingForm from "~components/Forms/LoadingForm";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import parseFields from "~utils/parseFields";
import { updateFormAp } from "~actions/Forms";
import updateFormFields from "./UpdateFormFields";
import condenseFormFields from "./CondenseFormFields";
import fields from "./Fields";

const title = "Sharks & Barracuda A/P Form";
const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 20,
};

export class ViewApForm extends Component {
	state = {
		fields,
		isLoading: true,
		isSubmitting: false,
	};

	static getDerivedStateFromProps = (
		{ events, viewForm, serverMessage },
		state,
	) => {
		if (state.isLoading && !isEmpty(events) && !isEmpty(viewForm)) {
			return {
				fields: state.fields.reduce(
					(result, field) => updateFormFields(result, field, events),
					[],
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
			const { viewForm } = this.props;

			if (!errors) {
				const condensedFields = condenseFormFields(validatedFields);
				const parsedFields = parseFields(condensedFields);

				this.props.updateFormAp({
					...parsedFields,
					_id: viewForm._id,
				});
			}
		});
	};

	render = () => {
		const { fields, isLoading, isSubmitting } = this.state;
		const { viewForm } = this.props;

		return (
			<Card
				extra={<BackButton push={Router.push} location="/employee/dashboard" />}
				title={
					<>
						<FaFileSignature style={iconStyle} />
						<span css="vertical-align: middle;">{title}</span>
					</>
				}
			>
				<FormContainer>
					<FormTitle
						header={title}
						title={title}
						description="Please select an availability response for all events below."
					/>
					<form style={{ textAlign: "center" }} onSubmit={this.handleSubmit}>
						{isLoading ? (
							<>
								<LoadingForm rows={1} minHeight="92px" />
								{[0, 1, 2].map(num => (
									<LoadingPanel
										key={num}
										height="400px"
										style={{ marginBottom: 20 }}
									/>
								))}
							</>
						) : (
							<>
								<Title style={{ color: "#025f6d" }}>
									{moment(viewForm.startMonth).format("MMMM Do YYYY")}
									&nbsp;-&nbsp;
									{moment(viewForm.endMonth).format("MMMM Do YYYY")}
								</Title>
								<Title
									style={{ color: "#025f6d", fontSize: 16, marginBottom: 40 }}
								>
									This form will expire on:{" "}
									<span style={{ color: "#f56342" }}>
										{moment(viewForm.expirationDate).format(
											"MMMM Do YYYY @ hh:mm a",
										)}
									</span>
								</Title>
								{viewForm.notes && (
									<Notes style={{ marginBottom: 60 }} notes={viewForm.notes} />
								)}
								<FieldGenerator fields={fields} onChange={this.handleChange} />
								<SubmitButton
									title="Submit AP Form"
									isSubmitting={isSubmitting}
								/>
							</>
						)}
					</form>
				</FormContainer>
			</Card>
		);
	};
}

ViewApForm.propTypes = {
	events: PropTypes.arrayOf(
		PropTypes.shape({
			_id: PropTypes.string,
			team: PropTypes.string,
			opponent: PropTypes.string,
			eventType: PropTypes.string,
			location: PropTypes.string,
			callTimes: PropTypes.arrayOf(PropTypes.string),
			uniform: PropTypes.string,
			seasonId: PropTypes.string,
			eventDate: PropTypes.string,
			notes: PropTypes.string,
		}),
	),
	serverMessage: PropTypes.string,
	updateFormAp: PropTypes.func.isRequired,
	viewForm: PropTypes.shape({
		_id: PropTypes.string,
		startMonth: PropTypes.string,
		endMonth: PropTypes.string,
		expirationDate: PropTypes.string,
		notes: PropTypes.string,
	}),
};

/* istanbul ignore next */
const mapStateToProps = ({ forms, server }) => ({
	events: forms.events,
	viewForm: forms.viewForm,
	serverMessage: server.message,
});

/* istanbul ignore next */
const mapDispatchToProps = {
	updateFormAp,
};

export default connect(mapStateToProps, mapDispatchToProps)(ViewApForm);
