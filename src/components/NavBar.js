import React from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";

const NavBar = () => {
	return (
		<Nav>
			<ul>
				<li>
					<Link to="/">Home</Link>
				</li>
				<li>
					<Link to="/about">About</Link>
				</li>
			</ul>
		</Nav>
	);
};

export default NavBar;

const Nav = styled.nav`
	ul {
		display: flex;
		gap: 1rem;
	}

	a {
		&:link,
		&:visited,
		&:focus {
			background-color: #4748ab;
			color: white;

			padding: 1rem 1.5rem;
			border-radius: 15px;

			font-weight: bold;
			text-align: center;
			display: inline-block;
		}
	}

	a:hover,
	a:active {
		background-color: #f32121;
	}
`;
