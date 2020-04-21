/* istanbul ignore file */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";

const Tab = ({ as, className, children, dataTest, href, style, target }) => (
	<Link href={href} as={as} prefetch={false} passHref>
		<a data-test={dataTest} style={style} className={className} target={target}>
			<div css="height: 100%;width: 100%;">{children}</div>
		</a>
	</Link>
);

Tab.propTypes = {
	as: PropTypes.string,
	className: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
	dataTest: PropTypes.string,
	href: PropTypes.string.isRequired,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
	target: PropTypes.string,
};

export default styled(Tab)`
	font-size: 18px;
	text-transform: capitalize;
	user-select: none;
	outline: none;
	border: 0;
	text-decoration: none;
	color: inherit;
`;
