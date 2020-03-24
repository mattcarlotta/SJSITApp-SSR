import React from "react";
import Head from "~components/Navigation/Head";

const Home = () => (
	<>
		<Head title="Dashboard" />
		<div>Welcome!</div>
		<Link blue href="/login">
			Login
		</Link>
	</>
);

export default Home;
