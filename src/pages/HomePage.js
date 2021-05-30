import React, { useState } from "react";
import { useImageContext } from "../context/ImageContext";
import ImageDownloader from "../utils/ImgDownloader";
import Description from "../components/Description";
import ImgSearch from "../components/ImgSearch";

import styled from "styled-components";

const HomePage = () => {
	const {
		filteredImg,
		setFilteredImg,
		select,
		setSelect,
		selectAll,
		setSelectAll,
	} = useImageContext();
	const [showDescription, setShowDescription] = useState({
		compare: "",
		show: false,
	});
	// const showDescriptionHandler = (uniqueID) => {
	// 	const filterHandler = [...filteredImg].find((id) => id.url === uniqueID);
	// 	filterHandler && setSelect(!select);
	// };
	return (
		<Wrapper>
			<ImgSearch />
			<div className="outer-container">
				{filteredImg.map(({ title, description, url, created }) => {
					return (
						<div key={url} className="innerContainer">
							<div className="title">
								<p>{title}</p>
								<p>Created on: {new Date(created).toUTCString()}</p>
							</div>
							<div
								className="img-container"
								onMouseEnter={() => setShowDescription({ compare: url })}
								onMouseLeave={() => setShowDescription({ compare: "" })}
							>
								{showDescription.compare === url && (
									<Description desc={description} />
								)}
								<img src={url} alt={title} />
							</div>
							<form
								onClick={(e) => {
									e.preventDefault();
								}}
							>
								<label>
									<input
										name="select"
										type="checkbox"
										checked={select}
										onChange={(e) => setSelect(e.target.checked)}
									/>
									Select
									<input
										name="selectAll"
										type="checkbox"
										checked={selectAll}
										onChange={(e) => setSelectAll(e.target.checked)}
									/>
									Select All
								</label>
								{(select || selectAll) && (
									<button
										className="download-btn"
										onClick={() => ImageDownloader(url, title)}
									>
										Download
									</button>
								)}
							</form>
						</div>
					);
				})}
			</div>
		</Wrapper>
	);
};

export default HomePage;

const Wrapper = styled.main`
	display: flex;
	flex-direction: column;
	gap: 2rem;
	@media screen and (min-width: 768px) {
		padding: 3rem;
	}

	.outer-container {
		@media screen and (min-width: 768px) {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 1rem;
		}
		@media screen and (min-width: 1024px) {
			grid-template-columns: 1fr 1fr 1fr;
			gap: 1rem;
		}
	}

	.innerContainer {
		background-color: #97b2d4;
		padding: 0 1rem;
	}
	.title {
		p {
			width: fit-content;
			text-align: right;

			&:first-child {
				color: #8e7a85;
				background-color: #f8f8ff;

				font-family: "Mate SC", serif;
				font-weight: bold;
				font-size: 1.8rem;
			}
		}
	}

	.img-container {
		position: relative;
		opacity: 1;
		transition: 0.3s ease-in-out;

		img {
			width: 100%;
			&:hover {
				opacity: 0.1;
			}
			@media screen and (min-width: 768px) {
				height: 300px;
				object-fit: contain;
			}
		}
	}
`;
