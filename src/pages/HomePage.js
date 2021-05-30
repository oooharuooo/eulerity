import React, { useState } from "react";
import { useImageContext } from "../context/ImageContext";
import ImgDownloader from "../utils/ImgDownloader";
import Description from "../components/Description";
import ImgSearch from "../components/ImgSearch";

import styled from "styled-components";

const HomePage = () => {
	const { filteredImg, setFilteredImg, selectAll } = useImageContext();
	const [showDescription, setShowDescription] = useState("");
	const [urlsDownload, setUrlsDownload] = useState([]);

	// Select Single or Multiple Img Handler
	const selectChangedHandler = (id, e, url, title) => {
		const selectedImg = filteredImg.map((filtered) => {
			// Compare main id with rendered id to modify Check-Box
			if (filtered.id === id) {
				filtered.select = e.target.checked;

				// Merge Url Link and title , delete it if the Check-Box is uncheck
				if (filtered.select) {
					setUrlsDownload([...urlsDownload, { url, title }]);
				} else if (!filtered.select) {
					setUrlsDownload(
						urlsDownload.filter((unwantedUrl) => unwantedUrl.url !== url)
					);
				}
			}
			return filtered;
		});

		setFilteredImg(selectedImg);
	};

	// Select All Imgs Handler
	const selectAllChangedHandler = (e) => {
		const selectedAllImg = filteredImg.map((filtered) => {
			filtered.select = e.target.checked;
			filtered.selectAll = e.target.checked;
			// Merge the original data
			if (filtered.selectAll) {
				setUrlsDownload(filteredImg);
			} else if (!filtered.selectAll) {
				setUrlsDownload([]);
			}
			return filtered;
		});
		setFilteredImg(selectedAllImg);
	};

	return (
		<Wrapper>
			<ImgSearch />
			<div className="button-container">
				<button className="btn-hover select-all">
					<input
						name="selectAll"
						type="checkbox"
						checked={selectAll}
						onChange={selectAllChangedHandler}
					/>
					Select All
				</button>
				<button
					className="btn-hover download-btn"
					onClick={() => ImgDownloader(urlsDownload)}
				>
					Download Selected Images
				</button>
			</div>

			<div className="outer-container">
				{filteredImg.map(({ id, title, description, url, created, select }) => {
					return (
						<div key={id} className="innerContainer">
							<div className="title">
								<p>{title}</p>
								<button className="btn-hover select">
									Select
									<input
										name="select"
										type="checkbox"
										checked={select}
										onChange={(e) => selectChangedHandler(id, e, url, title)}
									/>
								</button>
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

	.button-container {
		display: flex;
		gap: 1rem;
	}
	.btn-hover {
		border: 2px solid rgb(216, 2, 134);
		padding: 1rem 0.5rem;
		box-shadow: inset 0 0 0 0 #d80286;
		transition: ease-out 0.4s;

		input {
			width: 20px;
			height: 20px;
		}
		:hover {
			color: white;
			box-shadow: inset 0 0 0 50px #4748ab;
		}
	}
	.outer-container {
		display: grid;
		gap: 1rem;

		@media screen and (min-width: 768px) {
			grid-template-columns: 1fr 1fr;
		}
		@media screen and (min-width: 1024px) {
			grid-template-columns: 1fr 1fr 1fr;
		}
	}

	.innerContainer {
		background-color: #97b2d4;
		padding: 1rem;
	}
	.title {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;

		p {
			width: fit-content;
			text-align: right;

			&:first-child {
				color: #8e7a85;
				background-color: #f8f8ff;

				flex-basis: 50%;

				font-family: "Mate SC", serif;
				font-weight: bold;
				font-size: 1.8rem;
				text-align: start;
			}
		}

		button {
			height: fit-content;
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
