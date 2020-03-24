import styled from "styled-components";

export default styled.div`
	color: ${({ value }) => (value ? "#282c34;" : "#d3dce6")};
	padding: ${({ icon }) => (icon ? "11px 0 11px 48px" : "8px 8px 8px 14px")};
	font-size: 20px;
	-webkit-box-align: center;
	align-items: center;
	display: flex;
	flex-wrap: wrap;
	position: relative;
	box-sizing: border-box;
	flex: 1 1 0%;
	overflow: hidden;
`;
