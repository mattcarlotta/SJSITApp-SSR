import React from "react";
import PropTypes from "prop-types";
import isEmpty from "lodash.isempty";
import {
	Form,
	DatePicker,
	TimePicker,
	Transfer,
	Radio,
	Input as AntInput,
	Switch,
} from "antd";
import {
	FaCalendarPlus,
	FaClock,
	FaCheck,
	FaEraser,
	FaTimes,
} from "react-icons/fa";
import Icon from "~components/Body/Icon";
import Label from "~components/Body/Label";
import Notes from "~components/Body/Notes";
import Errors from "~components/Forms/Errors";
import Input from "~components/Forms/Input";
import Select from "~components/Forms/Select";
import Quill from "~components/Forms/LazyQuill";
import Eraser from "~components/Body/Eraser";

const RangePicker = DatePicker.RangePicker;
const TextArea = AntInput.TextArea;
const RadioGroup = Radio.Group;

const switchIconStyle = {
	position: "relative",
	top: 2,
};

const removeIconStyle = {
	cursor: "pointer",
	top: "10%",
	right: "15px",
};

const radioLabelStyle = {
	height: "auto",
	paddingBottom: 10,
	background:
		"linear-gradient(90deg,#12454e 0%,rgb(16,116,131) 50%,#12454e 100%)",
	color: "#fff",
};

const radioStyle = {
	// display: "block",
	textAlign: "center",
	cursor: "pointer",
	width: "100%",
	padding: 3,
	lineHeight: "30px",
	fontSize: 20,
	margin: "10px 0",
	height: "auto",
	// color: "#000",
	// textAlign: "center",
};

const radioContainerStyle = {
	backgroundColor: "#ebebeb",
	borderLeft: "1px solid",
	borderRight: "1px solid",
	borderTop: "1px solid",
	borderColor: "#9e9e9e",
	marginBottom: 0,
	paddingBottom: 10,
	borderTopLeftRadius: 3,
	borderTopRightRadius: 3,
};

const FieldGenerator = ({ fields, onChange }) =>
	fields.map(props => {
		switch (props.type) {
			case "text":
			case "email":
			case "password": {
				return <Input {...props} key={props.name} onChange={onChange} />;
			}
			case "select": {
				return <Select {...props} key={props.name} onChange={onChange} />;
			}
			case "switch": {
				return (
					<Form.Item key={props.name} style={{ height: 70 }}>
						<Label {...props} style={{ marginBottom: 5 }} />
						<Switch
							aria-label="toggle switch"
							checked={props.value}
							checkedChildren={<FaCheck style={switchIconStyle} />}
							unCheckedChildren={<FaTimes style={switchIconStyle} />}
							onChange={value =>
								onChange({ target: { name: props.name, value } })
							}
						/>
					</Form.Item>
				);
			}
			case "date": {
				return (
					<Form.Item key={props.name} style={{ height: 117 }}>
						<Label {...props} />
						<DatePicker
							{...props}
							aria-label="date picker"
							className={props.errors ? "has-error date-picker" : "date-picker"}
							suffixIcon={
								<FaCalendarPlus
									style={{
										color: props.errors ? "#d14023" : "#d3dce6",
									}}
								/>
							}
							onChange={value =>
								onChange({ target: { name: props.name, value } })
							}
						/>
						{props.errors && <Errors data-test="errors">{props.errors}</Errors>}
					</Form.Item>
				);
			}
			case "editor": {
				/* istanbul ignore next */
				return (
					<Form.Item key={props.name} style={{ height: 400 }}>
						{props.label && <Label {...props} />}
						<Quill
							className={props.errors ? "has-errors" : undefined}
							placeholder="Type a message..."
							value={props.value}
							modules={{
								toolbar: {
									container: [
										[{ font: [] }],
										[{ header: [false, 6, 5, 4, 3, 2, 1] }],
										["bold", "italic", "underline", "strike", "link"],
										["blockquote", "code-block"],
										[{ list: "ordered" }, { list: "bullet" }],
										[{ script: "sub" }, { script: "super" }],
										[{ indent: "-1" }, { indent: "+1" }],
										[{ align: [] }],
										[{ color: [] }, { background: [] }],
									],
								},
							}}
							onChange={value =>
								onChange({ target: { name: props.name, value } })
							}
						/>
						<Eraser
							id="erase-message"
							onClick={() =>
								onChange({ target: { name: props.name, value: "" } })
							}
						>
							<FaEraser style={{ fontSize: 18 }} />
						</Eraser>
						{props.errors && <Errors data-test="errors">{props.errors}</Errors>}
					</Form.Item>
				);
			}
			case "radiogroup": {
				return (
					<Form.Item style={radioContainerStyle} key={props.name}>
						<Label style={radioLabelStyle} {...props} />
						{props.notes && <Notes className="ap-form-note" {...props} />}
						<RadioGroup
							{...props}
							aria-label="radio group"
							onChange={onChange}
							className="ap-form-radio"
						>
							{!isEmpty(props.selectOptions) &&
								props.selectOptions.map(value => (
									<Radio.Button
										aria-label={value}
										style={radioStyle}
										key={value}
										value={value}
									>
										<span className="radio-value">{value}</span>
									</Radio.Button>
								))}
						</RadioGroup>
						{props.errors && (
							<Errors data-test="errors" style={{ textAlign: "center" }}>
								{props.errors}
							</Errors>
						)}
					</Form.Item>
				);
			}
			case "range": {
				return (
					<Form.Item key={props.name} style={{ height: 117 }}>
						<Label {...props} />
						<RangePicker
							{...props}
							aria-label="date range picker"
							className={props.errors ? "has-error" : ""}
							suffixIcon={
								<FaCalendarPlus
									style={{
										color: props.errors ? "#d14023" : "rgba(0, 0, 0, 0.25)",
									}}
								/>
							}
							onChange={value =>
								onChange({ target: { name: props.name, value } })
							}
						/>
						{props.errors && <Errors data-test="errors">{props.errors}</Errors>}
					</Form.Item>
				);
			}
			case "textarea": {
				return (
					<Form.Item
						key={props.name}
						className={props.className}
						style={{ minHeight: props.minHeight || 212, ...props.style }}
					>
						{props.label && <Label {...props} />}
						<TextArea
							name={props.name}
							aria-label={props.name}
							className={props.errors ? "has-error" : ""}
							disabled={props.disabled}
							maxLength={props.maxLength}
							placeholder={props.placeholder}
							style={props.innerStyle}
							onChange={onChange}
							rows={props.rows || 4}
							value={props.value}
						/>
						{props.errors && <Errors data-test="errors">{props.errors}</Errors>}
					</Form.Item>
				);
			}
			case "time": {
				return (
					<Form.Item
						key={props.name}
						style={{ height: props.height ? props.height : 117 }}
					>
						{props.label && <Label {...props} />}
						{props.onFieldRemove && (
							<Icon
								className="remove-time-slot"
								style={removeIconStyle}
								color="rgba(255, 0, 0, 0.65)"
								onHoverColor="rgba(204, 0, 0, 0.65)"
								onClick={() => props.onFieldRemove(props.name)}
								type="remove"
							/>
						)}
						<TimePicker
							{...props}
							id={props.name}
							aria-label="time picker"
							use12Hours
							minuteStep={5}
							format="h:mm a"
							className={props.errors ? "has-error" : ""}
							suffixIcon={
								<FaClock
									style={{
										color: props.errors ? "#d14023" : "rgba(0, 0, 0, 0.25)",
									}}
								/>
							}
							onChange={value =>
								onChange({ target: { name: props.name, value } })
							}
						/>
						{props.errors && <Errors data-test="errors">{props.errors}</Errors>}
					</Form.Item>
				);
			}
			case "transfer": {
				return (
					<Form.Item key={props.name} style={{ height: 350 }}>
						{props.label && <Label {...props} />}
						<Transfer
							aria-label="transfer users box"
							{...props}
							className={
								props.errors && isEmpty(props.value) ? "has-error" : ""
							}
							filterOption={(inputValue, option) =>
								option.email.toLowerCase().includes(inputValue.toLowerCase())
							}
							targetKeys={props.value}
							onChange={value =>
								onChange({ target: { name: props.name, value } })
							}
						/>
						{props.errors && <Errors data-test="errors">{props.errors}</Errors>}
					</Form.Item>
				);
			}
		}
	});

FieldGenerator.propTypes = {
	fields: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			type: PropTypes.string.isRequired,
			label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
			placeholder: PropTypes.string,
			props: PropTypes.any,
			icon: PropTypes.string,
			value: PropTypes.any,
			errors: PropTypes.string,
			required: PropTypes.bool,
			disabled: PropTypes.bool,
			readOnly: PropTypes.bool,
			tooltip: PropTypes.string,
			selectOptions: PropTypes.arrayOf(PropTypes.string),
		}),
	),
};

FieldGenerator.defaultProps = {
	fields: [],
};

export default FieldGenerator;

/*
return (
	<Form.Item key={props.name} style={{ height: 400 }}>
		{props.label && <Label {...props} />}
		<FroalaEditor
			model={props.value}
			config={{
				placeholderText: props.placeholder,
				toolbarButtons: {
					moreText: {
						buttons: [
							"bold",
							"italic",
							"underline",
							"strikeThrough",
							"subscript",
							"superscript",
							"fontFamily",
							"fontSize",
							"textColor",
							"backgroundColor",
							"insertLink",
							"quote",
						],
						buttonsVisible: 3,
					},
					moreParagraph: {
						buttons: [
							"alignLeft",
							"alignCenter",
							"alignRight",
							"alignJustify",
							"formatOLSimple",
							"formatOL",
							"formatUL",
							"paragraphFormat",
							"paragraphStyle",
							"lineHeight",
							"outdent",
							"indent",
							"insertHR",
						],
						buttonsVisible: 3,
					},
					moreMisc: {
						buttons: ["undo", "redo", "selectAll", "clearFormatting"],
						align: "right",
						buttonsVisible: 2,
					},
				},
			}}
			onModelChange={value =>
				onChange({ target: { name: props.name, value } })
			}
		/>
		{props.errors && <Errors>{props.errors}</Errors>}
	</Form.Item>
);
*/
