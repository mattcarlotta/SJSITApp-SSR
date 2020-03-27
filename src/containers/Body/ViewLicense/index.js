import React from "react";
import { Card } from "antd";
import { FaCopyright } from "react-icons/fa";
import Head from "~components/Navigation/Head";
import InfoText from "~components/Body/InfoText";
import Line from "~components/Body/Line";
import Title from "~components/Body/Title";

const title = "Licensing";
const iconStyle = {
	verticalAlign: "middle",
	marginRight: 10,
	fontSize: 20,
};

const License = () => (
	<>
		<Head title={title} />
		<Card
			title={
				<>
					<FaCopyright style={iconStyle} />
					<span css="vertical-align: middle;">{title}</span>
				</>
			}
		>
			<div css="padding: 0 30px 30px 30px;">
				<Title>Licensing</Title>
				<Line style={{ marginBottom: 10 }} />
				<InfoText>MIT License</InfoText>
				<br />
				<br />
				<InfoText>Copyright (c) 2019-2020 Matt Carlotta</InfoText>
				<br />
				<br />
				<InfoText>
					Permission is hereby granted, free of charge, to any person obtaining
					a copy of this software and associated documentation files (the
					&#34;Software&#34;), to deal in the Software without restriction,
					including without limitation the rights to use, copy, modify, merge,
					publish, distribute, sublicense, and/or sell copies of the Software,
					and to permit persons to whom the Software is furnished to do so,
					subject to the following conditions:
				</InfoText>
				<br />
				<br />
				<InfoText>
					The above copyright notice and this permission notice shall be
					included in all copies or substantial portions of the Software.
				</InfoText>
				<br />
				<br />
				<InfoText>
					THE SOFTWARE IS PROVIDED &#34;AS IS&#34;, WITHOUT WARRANTY OF ANY
					KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
					OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
					NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
					LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
					OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
					WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
				</InfoText>
			</div>
		</Card>
	</>
);

export default License;
