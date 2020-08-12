import LoginForm from "~containers/Forms/Auth/LoginForm";
import { wrapper } from "~store";
import { redirectTo } from "~utils/redirect";

const LoginFormPage = () => <LoginForm />;

export const getServerSideProps = wrapper.getServerSideProps(
	async ({ store: { getState }, res }) => {
		const { email } = getState().auth;

		if (email) redirectTo(res, "/employee/dashboard");

		return {};
	},
);

export default LoginFormPage;
