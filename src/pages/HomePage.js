import React, { useState } from "react";
import { useImageContext } from "../context/ImageContext";
import ImageDownloader from "../utils/ImgDownloader";
import Description from "../components/Description";
import ImgSearch from "../components/ImgSearch";

import styled from "styled-components";

const HomePage = () => {
	const { filteredImg, setFilteredImg, setSelect, selectAll, setSelectAll } =
		useImageContext();
	const [showDescription, setShowDescription] = useState("");
	const [urlsDownload, setUrlsDownload] = useState([]);

	const selectChangedHandler = (id, e, url) => {
		const selectedImg = filteredImg.map((filtered) => {
			// Compare main id with rendered id to modify Check-Box
			if (filtered.id === id) {
				filtered.select = e.target.checked;

				// Merge Url Link and delete it if the Check-Box is uncheck
				if (filtered.select === true) {
					setUrlsDownload([...urlsDownload, url]);
				} else if (filtered.select === false) {
					setUrlsDownload(urlsDownload.filter((d) => d !== url));
				}
			}

			return filtered;
		});
		setFilteredImg(selectedImg);
	};

	const selectAllChangedHandler = (e) => {
		const selectedAllImg = filteredImg.map((filtered) => {
			filtered.select = e.target.checked;
			return filtered;
		});
		setFilteredImg(selectedAllImg);
	};
	console.log(urlsDownload);
	return (
		<Wrapper>
			<ImgSearch />
			<button>
				<input
					name="selectAll"
					type="checkbox"
					checked={selectAll}
					onChange={selectAllChangedHandler}
				/>
				Select All
			</button>
			<div className="outer-container">
				{filteredImg.map(
					({ id, title, description, url, created, select, selectAll }) => {
						return (
							<div key={id} className="innerContainer">
								<div className="title">
									<p>{title}</p>
									<p>Created on: {new Date(created).toUTCString()}</p>
								</div>
								<div
									className="img-container"
									onMouseEnter={() => setShowDescription(id)}
									onMouseLeave={() => setShowDescription("")}
								>
									{showDescription === id && <Description desc={description} />}
									<img src={url} alt={title} />
								</div>
								<input
									name="select"
									type="checkbox"
									checked={select}
									onChange={(e) => selectChangedHandler(id, e, url)}
								/>
								Select
								{/* <input
									name="selectAll"
									type="checkbox"
									checked={selectAll}
									onChange={(e) => selectAllChangedHandler(id, e)}
								/>
								Select All */}
								{/* {(select || selectAll) && ( */}
								{/* <button
									className="download-btn"
									onClick={() => ImageDownloader(url, title)}
								>
									Download
								</button> */}
								{/* )} */}
							</div>
						);
					}
				)}
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
