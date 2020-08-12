import PropTypes from "prop-types";
import { useSelector } from "react-redux";
import AppLayout from "~components/App";
import FadeIn from "~components/Body/FadeIn";
import Spinner from "~components/Body/Spinner";
import Redirect from "~components/Navigation/Redirect";

const withMemberAuthentication = WrappedComponent => {
	const RequiresAuthentication = props => {
		const { email, role, serverError } = useSelector(({ auth, message }) => ({
			email: auth.email,
			role: auth.role,
			serverError: props.serverError || message,
		}));

		return role === "guest" ? (
			<Redirect href="/employee/login" serverError={serverError} />
		) : email ? (
			<AppLayout>
				<WrappedComponent {...props} />
			</AppLayout>
		) : (
			<FadeIn style={{ height: "100%" }} timing="1.5s">
				<Spinner />
			</FadeIn>
		);
	};

	RequiresAuthentication.propTypes = {
		serverError: PropTypes.string,
	};

	return RequiresAuthentication;
};

withMemberAuthentication.propTypes = {
	WrappedComponent: PropTypes.node.isRequired,
};

export default withMemberAuthentication;
