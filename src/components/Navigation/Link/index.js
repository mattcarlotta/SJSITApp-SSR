import styled from "styled-components";
import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";

const LinkComponent = ({
	as,
	className,
	children,
	dataTest,
	href,
	style,
	target,
}) => (
	<Link href={href} as={as} prefetch={false} passHref>
		<a data-test={dataTest} style={style} className={className} target={target}>
			{children}
		</a>
	</Link>
);

LinkComponent.propTypes = {
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
