import React, { Component } from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import { connect } from "react-redux";
import { FaUnlockAlt } from "react-icons/fa";
import Center from "~components/Body/Center";
import Modal from "~components/Body/Modal";
import SubmitButton from "~components/Body/SubmitButton";
import FieldGenerator from "~components/Forms/FieldGenerator";
import FormTitle from "~components/Forms/FormTitle";
import Link from "~components/Navigation/Link";
import fieldValidator from "~utils/fieldValidator";
import fieldUpdater from "~utils/fieldUpdater";
import parseFields from "~utils/parseFields";
import { signinUser } from "~actions/Auth";
import fields from "./Fields";

export class LoginForm extends Component {
	state = {
		fields,
		isSubmitting: false,
	};

	static getDerivedStateFromProps = ({ serverMessage }) =>
		serverMessage ? { isSubmitting: false } : null;

	componentDidMount() {
		if (this.props.email) Router.replace("/employee/dashboard");
	}

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
			prevState => ({
				fields: !errors ? prevState.fields : validatedFields,
				isSubmitting: !errors,
			}),
			() => {
				if (!errors) this.props.signinUser(parseFields(validatedFields));
			},
		);
	};

	render = () =>
		!this.props.email ? (
			<Modal>
				<FormTitle
					header="Log In"
					title="Welcome!"
					description="Sign into your account below."
				/>
				<form onSubmit={this.handleSubmit}>
					<FieldGenerator
						fields={this.state.fields}
						onChange={this.handleChange}
					/>
					<Link
						blue
						style={{ padding: 0, margin: 0, fontSize: 16 }}
						href="/employee/reset-password"
					>
						<FaUnlockAlt />
						&nbsp; Forgot your password?
					</Link>
					<SubmitButton isSubmitting={this.state.isSubmitting} title="Log In" />
				</form>
				<Center style={{ marginTop: 20 }}>
					<span>Don&#39;t have an account?</span> &nbsp;
					<Link blue style={{ padding: 0, margin: 0 }} href="/employee/signup">
						Sign up
					</Link>
				</Center>
			</Modal>
		) : null;
}

LoginForm.propTypes = {
	email: PropTypes.string,
	serverMessage: PropTypes.string,
	signinUser: PropTypes.func,
};

/* istanbul ignore next */
const mapStateTopProps = ({ auth, server }) => ({
	email: auth.email,
	serverMessage: server.message,
});

/* istanbul ignore next */
const mapDispatchToProps = {
	signinUser,
};

export default connect(mapStateTopProps, mapDispatchToProps)(LoginForm);
