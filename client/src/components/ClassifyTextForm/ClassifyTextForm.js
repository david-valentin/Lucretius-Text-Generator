import React, { Component } from "react";
import {
	FormGroup,
	Label,
	Input,
	Button,
	Row,
	Col,
	Form,
	Alert
} from "reactstrap";

import GenerateText from "../Classes/GenerateText";
import Loading from "../Loading/Loading";

class ClassifyTextForm extends Component {
	constructor() {
		super();
		this.GenerateText = new GenerateText("http://localhost:9393/");
		this.classifyText = this.classifyText.bind(this);
		this.handleTextareaForm = this.handleTextareaForm.bind(this);
		this.state = {
			submitted : false,
			fetching : false,
			input_text : ""
		};
		this.classifyText = this.classifyText.bind(this);
		this.handleTextareaForm = this.handleTextareaForm.bind(this);
	}

	/**
	 * classifyText - Classifies the text
	 *
	 * @param  {type} event description
	 * @return {type}       description
	 */
	classifyText(event) {
		this.setState({fetching : true});
		this.GenerateText.classifyText(this.state.input_text)
			.then((res) => {
				console.log("Res", res);
				this.setState({classified_text : res.classified_text, submitted : true, fetching : false});
			})
			.catch((err) => {
				console.error(err);
				this.setState({fetching : false});
			});
	}

	/**
	 * handleTextareaForm - Hnadles the change of the text form
	 *
	 * @param  {type} event description
	 * @return {type}       description
	 */
	handleTextareaForm(event) {
		this.setState({input_text: event.target.value});
	}

	render() {
		if (!this.state.submitted && !this.state.fetching) {
			return (
				<div>
					<Row>
						<Col sm="12" md={{ size: 6, offset: 3 }}>
							<h2>Lucretius Book Identifier</h2>
							<br/>
							<Form onSubmit={this.classifyText}>
								<FormGroup >
									<Label for="text">Enter Lucretius Text to be identified</Label>
									<Input type="textarea" name="text" id="lucretius_text"  onChange={this.handleTextareaForm}/>
									<br/>
								</FormGroup>
								<Button color="primary">Classify Text</Button>
							</Form>
						</Col>
					</Row>
				</div>
			);
		} else if (this.state.fetching && !this.state.error) {
			return (
				<Loading/>
			);
		} else if (this.state.submitted) {
			return (
				<div>
					<Row>
						<Col sm="12" md={{ size: 6, offset: 3 }}>
							<h2>Lucretius Book Identifier</h2>
							<h4>{this.state.classified_text}</h4>
						</Col>
					</Row>
				</div>
			);
		} else if (this.state.error) {
			return (
				<Alert color="danger">
				Something Broke!
				</Alert>
			);
		}
	}
}

export default ClassifyTextForm;
