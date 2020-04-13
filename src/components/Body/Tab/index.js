/* istanbul ignore file */
import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Link from "next/link";

const Tab = ({ as, className, children, href, style, target }) => (
	<span>
		<Link href={href} as={as} prefetch={false} passHref>
			<a style={style} className={className} target={target}>
				{children}
			</a>
		</Link>
	</span>
);

Tab.propTypes = {
	as: PropTypes.string,
	className: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
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
