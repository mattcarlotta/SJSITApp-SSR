import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import moment from "moment-timezone";
import { connect } from "react-redux";
import Router from "connected-react-next/router";
import { Card } from "antd";
import { FaEdit } from "react-icons/fa";
import BackButton from "~components/Body/BackButton";
import FormContainer from "~components/Body/FormContainer";
import SubmitButton from "~components/Body/SubmitButton";
import FieldGenerator from "~components/Forms/FieldGenerator";
import FormTitle from "~components/Forms/FormTitle";
import LoadingForm from "~components/Forms/LoadingForm";
import fieldUpdater from "~utils/fieldUpdater";
import parseFields from "~utils/parseFields";
import { fetchSeason, updateSeason } from "~actions/Seasons";
import fields from "./Fields";

const title = "Edit Season";
const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 20,
};

export class EditSeasonForm extends Component {
	state = {
		fields,
		isLoading: true,
		seasonId: "",
		isSubmitting: false,
	};

	static getDerivedStateFromProps = ({ editSeason, serverMessage }, state) => {
		if (!state.seasonId && !isEmpty(editSeason)) {
			const { endDate, seasonId, startDate } = editSeason;
			return {
				isLoading: false,
				seasonId,
				fields: state.fields.map(field =>
					field.type === "range"
						? {
								...field,
								disabled: false,
								value: [moment(startDate), moment(endDate)],
						  }
						: { ...field, value: seasonId },
				),
			};
		}

		if (serverMessage) return { isSubmitting: false };

		return null;
	};

	componentDidMount = () => {
		const { id } = this.props.match.params;

		this.props.fetchSeason(id);
	};

	handleChange = ({ target: { name, value } }) => {
		let seasonId = "";

		if (!isEmpty(value)) {
			const [startYear, endYear] = value;
			seasonId = `${startYear.format("YYYY")}${endYear.format("YYYY")}`;
		}

		this.setState(prevState => {
			const updateFields = prevState.fields.map(field =>
				field.type === "text" ? { ...field, value: seasonId } : { ...field },
			);

			return {
				...prevState,
				seasonId,
				fields: fieldUpdater(updateFields, name, value),
			};
		});
	};

	handleSubmit = e => {
		e.preventDefault();

		this.setState({ isSubmitting: true }, () => {
			const { fields: formFields } = this.state;
			const {
				editSeason: { _id },
				updateSeason,
			} = this.props;

			const parsedFields = parseFields(formFields);

			setTimeout(() => updateSeason({ ...parsedFields, _id }), 350);
		});
	};

	render = () => (
		<Card
			extra={<BackButton push={Router.back} />}
			title={
				<Fragment>
					<FaEdit style={iconStyle} />
					<span css="vertical-align: middle;">{title}</span>
				</Fragment>
			}
		>
			<FormContainer>
				<FormTitle
					header={title}
					title={title}
					description="Select a new start and end date to update the season."
				/>
				<form onSubmit={this.handleSubmit}>
					{this.state.isLoading ? (
						<LoadingForm rows={2} />
					) : (
						<Fragment>
							<FieldGenerator
								fields={this.state.fields}
								onChange={this.handleChange}
							/>
							<SubmitButton
								disabled={isEmpty(this.props.editSeason)}
								isSubmitting={this.state.isSubmitting}
								title="Update Season"
							/>
						</Fragment>
					)}
				</form>
			</FormContainer>
		</Card>
	);
}

EditSeasonForm.propTypes = {
	editSeason: PropTypes.shape({
		_id: PropTypes.string,
		seasonId: PropTypes.string,
		startDate: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.instanceOf(Date),
		]),
		endDate: PropTypes.oneOfType([
			PropTypes.string,
			PropTypes.instanceOf(Date),
		]),
	}),
	fetchSeason: PropTypes.func.isRequired,
	match: PropTypes.shape({
		params: PropTypes.shape({
			id: PropTypes.string.isRequired,
		}).isRequired,
	}).isRequired,
	serverMessage: PropTypes.string,
	updateSeason: PropTypes.func.isRequired,
};

EditSeasonForm.defaultProps = {
	editSeason: {},
};

const mapStateToProps = state => ({
	editSeason: state.seasons.editSeason,
	serverMessage: state.server.message,
});

const mapDispatchToProps = {
	fetchSeason,
	updateSeason,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditSeasonForm);
