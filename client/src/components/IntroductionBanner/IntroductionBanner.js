import React, {
	Component
} from "react";
import {
	Button,
	Jumbotron
} from "reactstrap";
import "../style/IntroductionBanner.css";
import GreekPillar from "../assets/imgs/icons8-greek-pillar-capital-48.png";

function IntroductionBanner() {
	return (
		<div className="moon-container">
			<div>
				<div className="loading">Waiting for "load" event...</div>
				<div className="moon">
					<img className="back-img" alt="Archaeology" src={require("../assets/imgs/icons8-physics-48.png")}/>
				</div>
				<div className="moon-2">
					<img className="back-img" alt="Book" src={require("../assets/imgs/icons8-book-48.png")}/>
				</div>
				<div className="moon-3">
					<img className="back-img" alt="Helmet" src={require("../assets/imgs/icons8-roman-helmet-48.png")}/>
				</div>
				<div className="moon-4">
					<img className="back-img" alt="Thriller" src={require("../assets/imgs/icons8-thriller-48.png")}/>
				</div>
			</div>
			<Jumbotron>
				<div className="logo_div">
					<img src={require("../assets/imgs/icons8-socrates-48.png")} alt="Logo" className="logo_img" id="p-t-3" />
				</div>
				<img src={GreekPillar} alt="Generic placeholder image" />
				<h1 className="display-3">Lucretius Text Generation</h1>
				<hr className="my-2" />
				<p>The Swerve, Markov Chains, and Bayesian Classifiers</p>
			</Jumbotron>
		</div>
	);
}

export default IntroductionBanner;
