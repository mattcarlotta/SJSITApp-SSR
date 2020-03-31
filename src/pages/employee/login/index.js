import LoginForm from "~containers/Forms/Auth/LoginForm";
import { redirectTo } from "~utils/redirect";

const LoginFormPage = () => <LoginForm />;

LoginFormPage.getInitialProps = async ({ store: { getState }, res }) => {
	const { email } = getState().auth;

	if (email) redirectTo(res, "/employee/dashboard");

	return {};
};

export default LoginFormPage;
