"use strict";

class GenerateText {
	constructor(server) {
		this.fetch = this.fetch.bind(this);
		this.server = server;
		this.format_text = this.format_text.bind(this);
	}

	/**
	 * classifyText - Classifies the input text
	 *
	 * @param  {type} text description
	 * @return {type}      description
	 */
	classifyText(text) {
		console.log("Text ", text);
		let new_text = text.trim();
		console.log("Trim: ", new_text);
		return this.fetch(this.getServer() + "api/v1/classify-text/", {
			method : "POST",
			body: JSON.stringify({text : text})
		})
			.then((res) => {
				console.log("Res", res);
				if (res) {
					return res;
				} else {
					return false;
				}
			});
	}


	/**
	 * parser - Parses
	 *
	 * @param  {type} text_input description
	 * @return {type}            description
	 */
	format_text(text_input) {
		let value = text_input.replace(/[A-Z]/, "\n $&");
		console.log("value ", value);
		return value; // $& means the whole matched string
	}

	/**
	 * fetchGeneratedText - Fetches the generated text
	 *
	 * @param  {type} philosopher_name description
	 * @return {type}                  description
	 */
	fetchGeneratedText(language) {
		return this.fetch(this.getServer() + `api/v1/generate-text/${language}`, {
			method : "GET"
		})
			.then((res) => {
				if (res) {
					return res;
				} else {
					return false;
				}
			});
	}


	/**
	 * getServer - Gets the string
	 *
	 * @return {String}  returns the server
	 */
	getServer() {
		return this.server;
	}

	/**
	 * fetch - Calls the server with the correct JWT token that is in the stored in the session
	 *
	 * @param  {type} url     the url of the server we are querying
	 * @param  {type} options the options that are associated with the url endpotin
	 * @return {JSON}         the response.json
	 */
	fetch(url, options) {
		// performs api calls sending the required authentication headers
		const headers = {
			"Accept": "application/json",
			"Content-Type": "application/json"
		};

		return fetch(url, {
			headers,
			options
		})
			.then(this._checkStatus)
			.then((response) => response.json());
	}

	/**
	 * _checkStatus - Checks the status of the response. Called with the fetch api
	 *
	 * @param  {type} response Response from the server for login
	 * @return {type}
	 * @throws {error} Error
	 */
	_checkStatus(response) {
		// raises an error in case response status is not a success
		if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
			return response;
		} else {
			var error = new Error(response.statusText);
			console.log("Response: " + JSON.stringify(response));
			error.response = response;
			return response;
		}
	}


}

export default GenerateText;
