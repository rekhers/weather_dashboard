import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styles from '/Users/Rekha/Dev/weather_app/public/scripts/styles.css.js';
import { api_key } from '../../api_config.js';

import Loader from 'react-loader-advanced';

export class Weather extends React.Component{

	constructor(props){
		super(props);
		console.log("props in weather");
		console.log(props)
		this.state = {coords: this.props.coords};
	}

	componentDidMount(){
		var that = this;
		$.when(this.getWeather(this.state.coords)).done(function(weather){
			console.log(weather);
			 that.setState({temperature: weather.currently.temperature, summary: weather.currently.summary})
		})
	}



	getWeather(coords){

			return $.ajax({
					  url: "https://api.darksky.net/forecast/" + api_key + "/" + coords,
					  dataType: "jsonp"
					});

		}


	render(){

	if(this.state.temperature && this.state.summary){
		return(<div> 
			<Temperature degrees={this.state.temperature}/>
			<Summary text={this.state.summary}/>
			</div>)
		} else {
			 	return (
			<Loader show={true} message={''}>

			 		<div> loading.. </div>
			 	</Loader>
			 		)

			 }
	}

}

class Temperature extends React.Component{
	constructor(props){
		super(props);
		this.state = {degrees: this.props.degrees};
	}

	render(){
		return(<div> {this.state.degrees }</div>)
	}

}


class Summary extends React.Component{
	constructor(props){
		super(props);
		this.state = {text: this.props.text};

	}
	render(){
		return(<div> {this.state.text }</div>)
	}

}