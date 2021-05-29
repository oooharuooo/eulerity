import React from "react";
import { useImageContext } from "../context/ImageContext";
import ImageDownloader from "../utils/ImgDownloader";

import uuid from "react-uuid";

const HomePage = () => {
	const { petImg } = useImageContext();

	return (
		<main>
			{petImg.map(({ title, description, url, created }) => {
				return (
					<div key={uuid()}>
						<p>
							<span>{title}</span>
							<span>{created}</span>
						</p>
						<p>{description}</p>
						<img src={url} alt={title} style={{ width: "100%" }} />
						<button onClick={() => ImageDownloader(url, title)}>
							Download Image
						</button>
					</div>
				);
			})}
		</main>
	);
};

export default HomePage;
