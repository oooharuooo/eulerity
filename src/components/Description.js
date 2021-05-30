import React from "react";
import styled from "styled-components";

const Description = ({ desc }) => {
	return (
		<Wrapper>
			<p>{desc}</p>
		</Wrapper>
	);
};

export default Description;

const Wrapper = styled.div`
	display: flex;
	position: absolute;

	height: 100%;
	width: 100%;

	background-color: whitesmoke;

	p {
		align-self: center;
		text-align: center;

		font-size: 1.5rem;
		padding: 2rem;
		width: 100%;
	}
`;
