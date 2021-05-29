import axios from "axios";

import React, { useContext, useState, useEffect } from "react";

// Create ContextAPI
const ImageContext = React.createContext();

export const ImageProvider = ({ children }) => {
	const [petImg, setPetImg] = useState([]);
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

	return (
		<ImageContext.Provider
			value={{ petImg, select, setSelect, selectAll, setSelectAll }}
		>
			{children}
		</ImageContext.Provider>
	);
};

// make sure use ContextAPI function
export const useImageContext = () => {
	return useContext(ImageContext);
};
