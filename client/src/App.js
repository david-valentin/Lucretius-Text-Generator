import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

// Components
import IntroductionBanner from "./components/IntroductionBanner/IntroductionBanner";
import NavigationBar from "./components/NavigationBar/NavigationBar";
import GenerateTextForm from "./components/GenerateTextForm/GenerateTextForm";
import ClassifyTextForm from "./components/ClassifyTextForm/ClassifyTextForm";
import About from "./components/About/About";


class App extends Component {
	constructor() {
		super();
		document.title = "Roman Philosophy";
	}

	render() {
		return (
			<Router>
				<div className="App">
					<NavigationBar/>
					<Switch>
						<Route exact path="/" component={IntroductionBanner}/>
						<Route exact path="/generate-text" component={GenerateTextForm}/>
						<Route exact path="/classify-text" component={ClassifyTextForm}/>
						<Route exact path="/about" component={About}/>
					</Switch>
				</div>
			</Router>

		);
	}
}

export default App;
