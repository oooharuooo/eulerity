import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const AboutPage = () => {
	return (
		<About>
			<h1>Eulerity</h1>
			<p>
				lorem ipsum dolor sit amet, consectetur adip.lorem ipsum dolor sit amet,
				consectetur adip lorem ipsum dolor sit amet, consectetur adip lorem
				ipsum dolor sit amet, consectetur adip lorem ipsum dolor sit amet,
				consectetur adip lorem ipsum dolor sit amet, consectetur adip
			</p>
			<button>
				<Link to="/">Back to Home</Link>
			</button>
		</About>
	);
};

export default AboutPage;

const About = styled.div`
	text-align: center;
	padding: 3rem 2rem;
`;
