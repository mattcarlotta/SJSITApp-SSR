import React from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import { connect } from "react-redux";
import Router from "next/router";
import { Card, Col } from "antd";
import { FaFileSignature } from "react-icons/fa";
import Bold from "~components/Body/Bold";
import Button from "~components/Body/Button";
import LoadingPanel from "~components/Body/LoadingPanel";
import WarningText from "~components/Body/WarningText";
import moment from "~utils/momentWithTZ";
import NoForms from "./NoForms";
import columns from "../Columns";

const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 22,
};

const warningStyle = {
	background: "transparent",
	verticalAlign: "middle",
	marginTop: 35,
	padding: 0,
	borderRadius: 3,
};

const format = "MMM Do @ hh:mm a";
const simpleFormat = "MMM Do";

export const Forms = ({ apform, isLoading }) => {
	const expDate = moment(apform.expirationDate);
	const hasExpired = expDate.toDate() < moment().toDate();

	return (
		<Col {...columns}>
			<Card
				style={{ marginBottom: 0 }}
				bodyStyle={{ minHeight: "300px" }}
				title={
					<>
						<FaFileSignature style={iconStyle} />
						<span css="vertical-align: middle;">Forms</span>
					</>
				}
				extra={
					!isEmpty(apform) && !hasExpired ? (
						<Button
							tertiary
							dataTest="view-apform"
							width="120px"
							disabled={hasExpired}
							padding="5px"
							marginRight="0px"
							style={{ fontSize: 16 }}
							onClick={() =>
								Router.push(
									`/employee/forms/view/[id]`,
									`/employee/forms/view/${apform._id}`,
								)
							}
						>
							View Form
						</Button>
					) : null
				}
			>
				{isLoading ? (
					<LoadingPanel />
				) : !isEmpty(apform) ? (
					<>
						<div css="text-align: center;background: linear-gradient(90deg,#12454e 0%,rgb(16,116,131) 50%,#12454e 100%);padding: 5px 0;color: #fff;font-size: 18px;border-top-right-radius: 3px;border-top-left-radius: 3px;">
							Sharks & Barracuda A/P Form
						</div>
						<div css="height:215px;overflow-y: auto;font-size: 17px;padding: 5px;border-right: 1px solid rgba(12, 137, 157, 0.4);border-bottom: 1px solid rgba(12, 137, 157, 0.4);border-left: 1px solid rgba(12, 137, 157, 0.4);background: #f7f6f6;">
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
									color: hasExpired ? "#f56342" : "#155a67",
								}}
							>
								{hasExpired
									? "This form has expired and is no longer viewable."
									: `This form will expire ${moment(expDate).fromNow()}!`}
							</WarningText>
						</div>
					</>
				) : (
					<NoForms />
				)}
			</Card>
		</Col>
	);
};

Forms.propTypes = {
	apform: PropTypes.shape({
		_id: PropTypes.string,
		startMonth: PropTypes.string,
		endMonth: PropTypes.string,
		expirationDate: PropTypes.string,
		eventCounts: PropTypes.number,
	}),
	isLoading: PropTypes.bool.isRequired,
};

/* istanbul ignore next */
const mapStateToProps = ({ dashboard }) => ({
	apform: dashboard.apform.data,
	isLoading: dashboard.apform.isLoading,
});

export default connect(mapStateToProps)(Forms);
