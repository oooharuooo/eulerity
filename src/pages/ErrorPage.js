import React from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const ErrorPage = () => {
	return (
		<Error>
			<h1>Something went wrong</h1>
			<button>
				<Link to="/">Back to Home</Link>
			</button>
		</Error>
	);
};

export default ErrorPage;

const Error = styled.div`
	text-align: center;
	padding: 3rem 2rem;
`;
