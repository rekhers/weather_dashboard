import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styles from '/Users/Rekha/Dev/weather_app/public/scripts/styles.css.js';
import mainstyles from '/Users/Rekha/Dev/weather_app/public/stylesheets/styles.css'

const container = document.getElementById("container");

const mainPage =(
		<div style={styles.holder}>	
			</div>
					);

ReactDOM.render(mainPage,container);


class Location extends React.Component{
	render(){
	 return <div style={styles.location}> {this.props.place} </div>
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
/*
*
* right now this is nested to preserve scope of the 
*
*/
		 $.when(getWeather(coords), geoCode(geolocate)).done(function(weather, location){
			buildPage(location.formatted_address, weather[0].currently.temperature, weather[0].currently.summary)
		 })

})




const buildPage = (loc = false, deg = false, summ = false) =>{ 


const pageTwo = (<div style={styles.holder}>
	        <Location place={loc}></Location>
            </div>
            );

const pageOne = (<div style={styles.holder}>
            </div>
            );

const pageThree = (<div style={styles.holder}>
	        <Location place={loc}></Location>
         	<Temperature temp={deg}></Temperature>
         	<Summary desc={summ}></Summary>
            </div>
  );


	if(loc && !deg && !summ){
		ReactDOM.render(pageTwo,container);
	} else if (loc && deg && summ){
		ReactDOM.render(pageThree,container);
	} else { 
		ReactDOM.render(pageOne,container);
	} 
}




