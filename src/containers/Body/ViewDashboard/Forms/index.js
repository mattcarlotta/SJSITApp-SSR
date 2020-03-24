import React, { Fragment, PureComponent } from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash/isEmpty";
import moment from "moment-timezone";
import { connect } from "react-redux";
import Router from "next/router";
import { Card, Col } from "antd";
import { FaFileSignature } from "react-icons/fa";
import Bold from "~components/Body/Bold";
import Button from "~components/Body/Button";
import CalendarContainer from "~components/Body/CalendarContainer";
import LoadingPanel from "~components/Body/LoadingPanel";
import WarningText from "~components/Body/WarningText";
import { fetchAPForm } from "~actions/Dashboard";
import NoForms from "./NoForms";
import columns from "../Columns";

const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 22,
};

const warningStyle = {
	verticalAlign: "middle",
	marginTop: 15,
	padding: "5px 8px",
	borderRadius: 3,
};

const format = "MMM Do YYYY @ hh:mm a";
const simpleFormat = "MM/DD/YYYY";

export class Forms extends PureComponent {
	componentDidMount = () => {
		this.props.fetchAPForm();
	};

	render = () => {
		const { apform, isLoading } = this.props;
		const expDate = moment(apform.expirationDate);
		const hasExpired = expDate.toDate() < moment().toDate();

		return (
			<Col {...columns}>
				<Card
					bodyStyle={{ minHeight: "300px" }}
					title={
						<Fragment>
							<FaFileSignature style={iconStyle} />
							<span css="vertical-align: middle;">Forms</span>
						</Fragment>
					}
					extra={
						!isEmpty(apform) && !hasExpired ? (
							<Button
								tertiary
								width="88px"
								disabled={hasExpired}
								padding="5px"
								marginRight="0px"
								style={{ fontSize: 16 }}
								onClick={() =>
									Router.push(`/employee/forms/view/${apform._id}`)
								}
							>
								View
							</Button>
						) : null
					}
				>
					{isLoading ? (
						<LoadingPanel />
					) : (
						<CalendarContainer>
							{!isEmpty(apform) ? (
								<div css="margin-top: 10px;">
									<div css="text-align: center;background-color: #025f6d;color: #fff;border-radius: 3px;font-size: 18px;">
										Sharks & Barracuda A/P Form
									</div>
									<div css="font-size: 17px;padding: 0 5px;margin-top: 15px;">
										{/* <div>
											<Bold>Form Id:</Bold>
											{apform._id}
										</div> */}
										<div>
											<Bold>Form Dates:</Bold>
											{moment(apform.startMonth).format(simpleFormat)} -{" "}
											{moment(apform.endMonth).format(simpleFormat)}
										</div>
										<div>
											<Bold>Expiration Date:</Bold>
											{expDate.format(format)}
										</div>
										<div>
											<Bold>Event Count:</Bold>
											{apform.eventCounts}
										</div>
										<WarningText
											style={{
												...warningStyle,
												backgroundColor: hasExpired ? "#f56342" : "#2979ff",
											}}
										>
											{hasExpired
												? "This form has expired and is no longer viewable."
												: `This form will expire ${moment(expDate).fromNow()}!`}
										</WarningText>
									</div>
								</div>
							) : (
								<NoForms />
							)}
						</CalendarContainer>
					)}
				</Card>
			</Col>
		);
	};
}

Forms.propTypes = {
	apform: PropTypes.shape({
		_id: PropTypes.string,
		startMonth: PropTypes.string,
		endMonth: PropTypes.string,
		expirationDate: PropTypes.string,
		eventCounts: PropTypes.number,
	}),
	isLoading: PropTypes.bool.isRequired,
	fetchAPForm: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	apform: state.dashboard.apform.data,
	isLoading: state.dashboard.apform.isLoading,
});

const mapDispatchToProps = {
	fetchAPForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(Forms);
