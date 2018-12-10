import React, { Component } from "react";
import {
	Col,
	Button,
	Form,
	FormGroup,
	Label,
	Input,
	FormText,
	Row,
	Media,
} from "reactstrap";

import GreekPillar from "../assets/imgs/icons8-greek-pillar-capital-48.png";
import STATIC_STRINGS from "../assets/STATIC_STRINGS/STATIC_STRINGS";
import GenerateText from "../Classes/GenerateText";
import Loading from "../Loading/Loading";
import "../style/GeneratorText.css";

/**
 * This form takes an input from the user of a philosopher of their choice that they want to
 * generate
 * returns a generated text
 */
class GenerateTextForm extends Component {
	constructor()  {
		super();
		this.state = {
			fetching : false,
			successfully_generated : false,
			language : "English"
		};
		this.GenerateText = new GenerateText("http://localhost:9393/");
		this.onPhilosopherSelectionChange = this.onPhilosopherSelectionChange.bind(this);
		this.handlePhilosopherSubmit = this.handlePhilosopherSubmit.bind(this);
	}


	onPhilosopherSelectionChange(event) {
		this.setState({language: event.target.value});
	}

	handlePhilosopherSubmit(event) {
		this.setState({fetching : true});
		this.GenerateText.fetchGeneratedText(this.state.language)
			.then((res) => {
				if (res.generated_text !== undefined) {
					console.log(res);
					this.setState({generated_text : res.generated_text, fetching : false, successfully_generated : true});
				} else {
					this.setState({generated_text : "Nothing"});
				}
			});
		event.preventDefault();
	}

	render() {
		if (this.state.fetching === false && this.state.successfully_generated === false) {
			return (
				<div>
					<h2>Lucretius Text Generation</h2>
					<p className="lead">See what text is generated!</p>
					<br/>
					<Row>
						<Col sm="12" md={{ size: 6, offset: 3 }}>
							<Form onSubmit={this.handlePhilosopherSubmit}>
								<FormGroup>
									<Label for="roman_philosopher">Select a Language to generate Lucretius Text</Label>
									<Input type="select" name="select" id="language_select" onChange={this.onPhilosopherSelectionChange}>
										{
											STATIC_STRINGS.LIST_OF_LANGUAGES.map((language, idx) => {
												return <option key={idx}>{language}</option>;
											})
										}
									</Input>
								</FormGroup>
								<Button color="primary">Generate Text</Button>
							</Form>
						</Col>
					</Row>
				</div>
			);
		} else if (this.state.fetching) {
			return (
				<Loading />
			);
		} else if (this.state.successfully_generated) {
			return (
				<div>
					<Media>
			      <Media body>
							<Media right href="#">
								<div className="logo_div">
									<img src={require("../assets/imgs/icons8-socrates-48.png")} alt="Logo" className="logo_img" id="p-t-3" />
								</div>
								<img src={GreekPillar} alt="Generic placeholder image" />
			        </Media>
							<Media heading>
			          Lucretius Generated Text
			        </Media>
			         <p className="philosophy-text">{this.state.generated_text}</p>
			      </Media>
		    	</Media>
				</div>
			);
		}
	}
}

// Specifies the default values for props:
GenerateTextForm.defaultProps = {
	language: "English"
};

export default GenerateTextForm;
