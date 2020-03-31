import { redirectTo } from "~utils/redirect";

const Home = () => null;

Home.getInitialProps = async ({ res }) => {
	redirectTo(res, "/employee/login");

	return {};
};

export default Home;
