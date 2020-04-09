import React, { Component } from "react";
import PropTypes from "prop-types";
import get from "lodash.get";
import { withRouter } from "next/router";
import { connect } from "react-redux";
import Modal from "~components/Body/Modal";
import SubmitButton from "~components/Body/SubmitButton";
import FieldGenerator from "~components/Forms/FieldGenerator";
import FormTitle from "~components/Forms/FormTitle";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import parseFields from "~utils/parseFields";
import { updateUserPassword } from "~actions/Auth";
import fields from "./Fields";

export class NewPasswordForm extends Component {
	constructor(props) {
		super(props);

		const token = get(props, ["router", "query", "token"]);

		this.state = {
			fields,
			token,
			isSubmitting: false,
		};
	}

	static getDerivedStateFromProps = ({ serverMessage }) =>
		serverMessage ? { isSubmitting: false } : null;

	handleChange = ({ target: { name, value } }) => {
		this.setState(prevState => ({
			...prevState,
			fields: fieldUpdater(prevState.fields, name, value),
		}));
	};

	handleSubmit = e => {
		e.preventDefault();
		const { validatedFields, errors } = fieldValidator(this.state.fields);

		this.setState(
			{ fields: !errors ? fields : validatedFields, isSubmitting: !errors },
			() => {
				if (!errors) {
					const { token } = this.state;
					const parsedFields = parseFields(validatedFields);

					this.props.updateUserPassword({ ...parsedFields, token });
				}
			},
		);
	};

	render = () => (
		<>
			<div css="height: 100vh;background: #ebebeb;" />
			<Modal>
				<FormTitle
					header="Update Password"
					title="Update Password"
					description="	Enter a new password to update your current password."
				/>
				<form onSubmit={this.handleSubmit}>
					<FieldGenerator
						fields={this.state.fields}
						onChange={this.handleChange}
					/>
					<SubmitButton
						isSubmitting={this.state.isSubmitting}
						title="Update Password"
					/>
				</form>
			</Modal>
		</>
	);
}

NewPasswordForm.propTypes = {
	router: PropTypes.shape({
		query: PropTypes.shape({
			token: PropTypes.string,
		}),
	}),
	serverMessage: PropTypes.string,
	updateUserPassword: PropTypes.func.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = ({ server }) => ({
	serverMessage: server.message,
});

/* istanbul ignore next */
const mapDispatchToProps = {
	updateUserPassword,
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(NewPasswordForm),
);
