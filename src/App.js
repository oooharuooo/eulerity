import React from "react";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
import ErrorPage from "./pages/ErrorPage";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
	return (
		<Router>
			<NavBar />
			<Switch>
				<Route exact path="/">
					<HomePage />
				</Route>
				<Route exact path="/about">
					<AboutPage />
				</Route>
				<Route>
					<ErrorPage />
				</Route>
			</Switch>
		</Router>
	);
};

export default App;
