import React from "react";
import { useImageContext } from "../context/ImageContext";

import styled from "styled-components";

const ImgSearch = () => {
	const { searchTerm, setSearchTerm } = useImageContext();

	return (
		<SearchBar>
			<form onSubmit={(e) => e.preventDefault()}>
				<input
					type="text"
					placeholder="Search by title or description"
					name="term"
					value={searchTerm}
					onChange={(e) => setSearchTerm(e.target.value)}
				/>
			</form>
		</SearchBar>
	);
};

export default ImgSearch;

const SearchBar = styled.div`
	input {
		width: 100%;
		text-align: center;
		padding: 0.8rem 0;
		font-size: 1.3rem;
		&:focus {
			color: #00b4cc;
		}
	}
`;
