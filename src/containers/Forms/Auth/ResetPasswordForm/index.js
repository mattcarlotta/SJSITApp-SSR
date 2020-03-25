import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Center from "~components/Body/Center";
import Modal from "~components/Body/Modal";
import SubmitButton from "~components/Body/SubmitButton";
import FieldGenerator from "~components/Forms/FieldGenerator";
import FormTitle from "~components/Forms/FormTitle";
import Link from "~components/Navigation/Link";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import parseFields from "~utils/parseFields";
import { resetPassword } from "~actions/Auth";
import fields from "./Fields";

export class ResetPasswordForm extends Component {
	state = {
		fields,
		isSubmitting: false,
	};

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
				if (!errors) this.props.resetPassword(parseFields(validatedFields));
			},
		);
	};

	render = () => (
		<Modal>
			<FormTitle
				header="Reset Password"
				title="Reset Password"
				description="Enter your email to request a password reset."
			/>
			<form onSubmit={this.handleSubmit}>
				<FieldGenerator
					fields={this.state.fields}
					onChange={this.handleChange}
				/>
				<span>
					<p style={{ margin: 0, padding: 0, fontSize: 16, display: "inline" }}>
						Already have an account?
					</p>
					&nbsp;
					<Link
						blue
						style={{ padding: 0, margin: 0, fontSize: 16 }}
						href="/employee/login"
					>
						Log in
					</Link>
				</span>
				<SubmitButton
					isSubmitting={this.state.isSubmitting}
					title="Reset Password"
				/>
			</form>
			<Center style={{ marginTop: 20 }}>
				<span>Don&#39;t have an account?</span> &nbsp;
				<Link blue style={{ padding: 0, margin: 0 }} href="/employee/signup">
					Sign up
				</Link>
			</Center>
		</Modal>
	);
}

ResetPasswordForm.propTypes = {
	resetPassword: PropTypes.func.isRequired,
	serverMessage: PropTypes.string,
};

const mapStateToProps = state => ({
	serverMessage: state.server.message,
});

const mapDispatchToProps = {
	resetPassword,
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPasswordForm);
