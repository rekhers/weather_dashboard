import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styles from '/Users/Rekha/Dev/weather_app/public/scripts/styles.css.js';

import Loader from 'react-loader-advanced';
import { Weather } from '../scripts/weather.js';
import { Location } from '../scripts/location.js';


/*
*
* This top level container component gets the browser's coordinates from the Navigator utility as a deferred object.
* The children components take the coordinates as props and each return deferred objects in order to get the weather data
* and geocoded location text
*
*
*/
class WeatherContainer extends React.Component{


 	constructor(props){
 		super(props)
 		this.state = {coords: '', geoLocate: ''}
 		this.styles ={
 			height: "100%",
 			width: "100%"
 		}
 	}

 	componentDidMount(){
 		var that = this;

 		$.when(this.getLocation()).then(function(data){
			console.log("data")
		 	console.log(data)

		 //decide on a type?!
		 const lat = data.coords.latitude, 
		 long = data.coords.longitude,
		 coords = lat + "," + long,
		 geolocate = new google.maps.LatLng(lat, long);

		 that.setState({coords: coords, geoLocate: geolocate});
 		})
 	}

	getLocation(){

	  var deferred = $.Deferred();

		   if(navigator.geolocation) {
				     navigator.geolocation.getCurrentPosition(deferred.resolve, deferred.reject, { timeout: 5000 });
		   		 } else {
		   		 	   deferred.reject(new Error('Your browser does not support Geo Location.'));
		   		 }

	   		 return deferred.promise();
   		
 	 }


	render(){

			if(this.state.coords && this.state.geoLocate){
			 	return (
			 		<div>
				 		<Weather coords={this.state.coords}/>
				 		<Location geolocate={this.state.geoLocate}/>
			 		</div>
			 		)
			 } 
			 	return (
			 	<Loader show={true} message={''}  backgroundStyle={{backgroundColor: 'black'}}>

			 		<div style={this.styles}> top level </div>

			 		</Loader>
			 		)
			 



	}


}





const container = document.getElementById("container");

   
ReactDOM.render(<WeatherContainer />, container);








