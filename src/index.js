import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";

import { ImageProvider } from "./context/ImageContext";

ReactDOM.render(
	<ImageProvider>
		<App />
	</ImageProvider>,
	document.getElementById("root")
);
