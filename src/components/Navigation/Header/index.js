import React from "react";
import Link from "~components/Navigation/Link";
import NavBar from "~components/Navigation/NavBar";
import NavBarContainer from "~components/Navigation/NavBarContainer";
import NavContainer from "~components/Navigation/NavContainer";
import Nav from "~components/Navigation/Nav";
import NavItem from "~components/Navigation/NavItem";
import NavTitle from "~components/Navigation/NavTitle";

const navitems = [
	{ to: "/", text: "Home" },
	// { to: "/about", text: "About" },
	// { to: "/contact", text: "Contact" },
	{ to: "/employee/login", text: "Employee Portal" },
];

const Header = () => (
	<NavBarContainer>
		<NavBar>
			<NavTitle>
				<Link href="/">SJS Ice Team</Link>
			</NavTitle>
			<NavContainer>
				<Nav>
					{navitems.map(({ to, text }) => (
						<NavItem key={text}>
							<Link white href={to}>
								{text}
							</Link>
						</NavItem>
					))}
				</Nav>
			</NavContainer>
		</NavBar>
	</NavBarContainer>
);

export default Header;
