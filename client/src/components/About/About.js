import React, { Component } from "react";
import { Jumbotron, Button, Container } from "reactstrap";
import STATIC_STRINGS from "../assets/STATIC_STRINGS/STATIC_STRINGS";

const About = () =>  {
	return (
		<div>
			<Jumbotron fluid>
				<Container fluid>
					<h2 className="display-4">Roman Philosophy: Classifier and Generator</h2>
					<p className="lead">What makes philosophy...philosphy?</p>
					<ul>
						<br/>
						<h2>Abstract</h2>
						<p>{STATIC_STRINGS.ABSTRACT}
						</p>
						<br/>
						<h2>Materials and Methods</h2>
						<p>{STATIC_STRINGS.MATERIALS_AND_METHODS}
						</p>
						<h2>Markov Chains</h2>
						<p>{STATIC_STRINGS.MARKOV_CHAINS}
						</p>
						<img src={require("../assets/imgs/markov.png")} />
						<br/>
						<h2>Results</h2>
						<p>{STATIC_STRINGS.RESULTS}</p>
						<br/>
						<h2>Conclusion</h2>
						<p>{STATIC_STRINGS.CONCLUSION}</p>
					</ul>
				</Container>
			</Jumbotron>
		</div>
	);
};

export default About;
