import styled from "styled-components";
import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const LinkComponent = ({ className, children, href, style, target }) => (
	<Link href={href} prefetch={false} passHref>
		<a style={style} className={className} target={target}>
			{children}
		</a>
	</Link>
);

LinkComponent.propTypes = {
	className: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
	href: PropTypes.string.isRequired,
	style: PropTypes.objectOf(
		PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	),
	target: PropTypes.string,
};

export default styled(LinkComponent)`
	color: ${({ blue }) => (blue ? "#0075e0" : "#fff")};
	white-space: nowrap;
	text-decoration: none;
	margin-right: 20px;
	padding: 8px 16px;
	transition: all 0.2s ease-in-out;
	border-radius: 4px;

	&:hover {
		color: ${({ blue }) => (blue ? "#40a9ff" : "#62c0ce")};
	}

	&:focus {
		color: ${({ blue }) => (blue ? "#40a9ff" : "#62c0ce")};
		outline: none;
		border: 0;
	}
`;
