import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styles from '/Users/Rekha/Dev/react_project/public/scripts/styles.css.js';


class Location extends React.Component{
	render(){
	 return <div> {this.props.place} </div>
	}
}

class Temperature extends React.Component{
	render(){
		return <div style={styles.temperature}> {this.props.temp} </div>
		}
}


class Summary extends React.Component{
	render(){
	 	return <div style={styles.summary}> {this.props.desc}</div>
	}
}


/*
*  
*  Browser's navigator instance will return coords to feed to other function
*  Set timeout to 5 seconds if deferred object doesn't get resolved 
*
*/
const getLocation = () => {

  var deferred = $.Deferred();

   if(navigator.geolocation) {
		     navigator.geolocation.getCurrentPosition(deferred.resolve, deferred.reject, { timeout: 5000 });
   		 } else {
   		 	   deferred.reject(new Error('Your browser does not support Geo Location.'));
   		 }

   		 return deferred.promise();
   		
   		}
   

/* 
*
* Create a geocode object and translate our geolocate object into a specific location
*
*/ 
const geoCode = (geolocate_coords) => {

		  var deferred = $.Deferred();

	     var geocoder = new google.maps.Geocoder();     

        return $.Deferred(function(def){

        			geocoder.geocode({'latLng': geolocate_coords}, function(results, status) {
                    
                    if (status == google.maps.GeocoderStatus.OK) {
                   
                    	// let city = results[4].address_components[0].long_name,
                     //       state = results[4].address_components[1].long_name;

                     //     let place = city + " , " + state;
                     //     console.log(place);
                          	def.resolve(results[4]);

                     	} else {
                     		def.reject(new Error(status));
                     	}  
                 });    

  			}).promise();

        }

/* 
*
* Get weather data from DarkSky API based on current location from the Navigator instance
*
*/ 
const getWeather = (coords) =>{
	       const api_key = 'ee2ac15f04e14b6646dc6508f06d7532';

			return $.ajax({
					  url: "https://api.darksky.net/forecast/" + api_key + "/" + coords,
					  dataType: "jsonp"
					}).done(function(data){
						return data;					  	
                	});
	}



/*
*
* The weather from the DarkSky API as well as the Geocoder depend on the Navigator instance's location data, 
* so we are turning this async object into a deferred promise that will resolve before we make our two other  
* ajax calls that depend on the location data
*
*/
$.when(getLocation()).then(function(data){
		 console.log(data);
		 //decide on a type?!
		const lat = data.coords.latitude, 
		 long = data.coords.longitude,
		 coords = lat + "," + long,
		 geolocate = new google.maps.LatLng(lat, long);

	 $.when(getWeather(coords), geoCode(geolocate)).done(function(weather, location){
	 		 	console.log("we're trying");
	 			console.log(weather);
	 			console.log(location);

			buildPage(location.formatted_address, weather[0].currently.temperature, weather[0].currently.summary)

		 })
	});



const buildPage = (loc, deg, summ) => {

console.log("deg");
console.log(deg);

var page = (<div style={styles.holder}>
         		<Location style={styles.location} place={loc}/>
         		<Temperature style={styles.temperature} temp={deg}/>
         		<Summary style={styles.summary} desc={summ}/>
                </div>
  );


let container = document.getElementById("container");
 
ReactDOM.render(page,container);

}

	


