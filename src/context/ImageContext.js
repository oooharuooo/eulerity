import axios from "axios";
import uuid from "react-uuid";
import React, { useContext, useState, useEffect, useCallback } from "react";

// Create ContextAPI
const ImageContext = React.createContext();

export const ImageProvider = ({ children }) => {
	const [searchTerm, setSearchTerm] = useState("");
	const [petImg, setPetImg] = useState([]);
	const [filteredImg, setFilteredImg] = useState([]);

	const [select, setSelect] = useState(false);
	const [selectAll, setSelectAll] = useState(false);

	// Fetching Data
	const fetchData = useCallback(async () => {
		const { data } = await axios.get(
			"http://eulerity-hackathon.appspot.com/pets"
		);
		// Added unique id, select and selectAll to the data
		setPetImg(
			data.map((modified) => {
				return {
					...modified,
					id: uuid(),
					select,
					selectAll,
				};
			})
		);
	}, [select, selectAll]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

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
				setFilteredImg,
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
