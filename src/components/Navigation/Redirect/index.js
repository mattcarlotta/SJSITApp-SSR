import * as React from "react";
import PropTypes from "prop-types";
import Router from "next/router";
import toast from "~components/Body/Toast";

const Redirect = ({ href, as, options, push, serverError }) => {
	React.useEffect(() => {
		const method = push ? Router.push : Router.replace;
		method(href, as, options);

		return () => {
			if (serverError) toast({ type: "error", message: serverError });
		};
	}, []);

	return null;
};

Redirect.propTypes = {
	href: PropTypes.string.isRequired,
	as: PropTypes.string,
	options: PropTypes.shape({
		shallow: PropTypes.string,
	}),
	push: PropTypes.bool,
	serverError: PropTypes.string,
};

export default Redirect;
