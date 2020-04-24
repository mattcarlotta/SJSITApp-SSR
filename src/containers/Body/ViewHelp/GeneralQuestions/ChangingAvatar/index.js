import React from "react";
import { FaCloudUploadAlt, FaUpload } from "react-icons/fa";
import Button from "~components/Body/Button";
import InfoText from "~components/Body/InfoText";
import TextContainer from "~components/Body/TextContainer";
import Link from "~components/Navigation/Link";
import WarningText from "~components/Body/WarningText";

const linkStyle = {
	margin: 0,
	padding: 0,
};

const btnStyle = {
	display: "inline-block",
};

const ChangingAvatar = () => (
	<TextContainer>
		<InfoText>To change your avatar, go to the</InfoText>
		&nbsp;
		<Link blue style={linkStyle} href="/employee/settings" target="_blank">
			Settings
		</Link>
		&nbsp;
		<InfoText>page and update your avatar by clicking the</InfoText>
		&nbsp;
		<Button
			primary
			width="130px"
			padding="0px"
			marginRight="0px"
			style={btnStyle}
			onClick={null}
		>
			<FaCloudUploadAlt
				style={{
					fontSize: 18,
					marginRight: 5,
					position: "relative",
					top: 3,
				}}
			/>
			&nbsp;Upload
		</Button>
		&nbsp;
		<InfoText>
			button. Click or drag and drop an image on the upload box. Once an image
			has been selected, click the
		</InfoText>
		&nbsp;
		<Button
			primary
			width="50px"
			padding="0px"
			marginRight="0px"
			style={btnStyle}
			onClick={null}
		>
			<FaUpload style={{ fontSize: 16 }} />
		</Button>
		&nbsp;
		<InfoText>
			button to upload it. If the image upload is successful, your account will
			be updated with the new avatar.
		</InfoText>
		&nbsp;
		<WarningText>
			For the best results, pick an image where the subject is centered. In
			addition, images larger than 10mb or are not .jpg/.jpeg/.png files will be
			rejected.
		</WarningText>
	</TextContainer>
);

export default ChangingAvatar;
