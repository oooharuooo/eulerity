const ImgDownloader = (fakeurl, title) => {
	const z = [
		"https://images.pexels.com/photos/220938/pexels-photo-220938.jpeg?format=tiny",
		"https://images.pexels.com/photos/53966/rabbit-palm-hand-snatch-53966.jpeg?format=tiny",
	];
	z.forEach((url) => {
		fetch(`${url}`).then((response) => {
			response.blob().then((blob) => {
				let url = window.URL.createObjectURL(blob);
				let a = document.createElement("a");
				a.href = url;
				a.download = `${title}`;
				a.click();
			});
		});
	});
};

export default ImgDownloader;
