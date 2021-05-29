const ImgDownloader = (url, title) => {
	fetch(`${url}`).then((response) => {
		response.blob().then((blob) => {
			let url = window.URL.createObjectURL(blob);
			let a = document.createElement("a");
			a.href = url;
			a.download = `${title}`;
			a.click();
		});
	});
};

export default ImgDownloader;
