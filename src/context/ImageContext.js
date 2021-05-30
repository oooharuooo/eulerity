import axios from "axios";

import React, { useContext, useState, useEffect } from "react";

// Create ContextAPI
const ImageContext = React.createContext();

export const ImageProvider = ({ children }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [petImg, setPetImg] = useState([]);
	const [filteredImg, setFilteredImg] = useState([]);
	const [select, setSelect] = useState(false);
	const [selectAll, setSelectAll] = useState(false);

	// Fetching Data
	const fetchData = async () => {
		const { data } = await axios.get(
			"http://eulerity-hackathon.appspot.com/pets"
		);
		setPetImg(data);
	};
	useEffect(() => {
		fetchData();
	}, []);

	// Filter Img base on user search term
	useEffect(() => {
		setFilteredImg(
			petImg.filter(({ title, description }) => {
				return (
					title.toLowerCase().includes(searchTerm.toLowerCase()) ||
					description.toLowerCase().includes(searchTerm.toLowerCase())
				);
			})
		);
	}, [searchTerm, petImg]);

	return (
		<ImageContext.Provider
			value={{
				petImg,
				filteredImg,
				select,
				setSelect,
				selectAll,
				setSelectAll,
				searchTerm,
				setSearchTerm,
			}}
		>
			{children}
		</ImageContext.Provider>
	);
};

// make sure use ContextAPI function
export const useImageContext = () => {
	return useContext(ImageContext);
};
