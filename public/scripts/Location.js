import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import styles from '/Users/Rekha/Dev/weather_app/public/scripts/styles.css.js';
import Loader from 'react-loader-advanced';

export class Location extends React.Component{

	constructor(props){
		super(props);
		console.log(props);
		this.state = {geolocate: this.props.geolocate}
			this.styles ={
 			height: "100%",
 			width: "100%",
 			position: "absolute"
 		}
	}


	componentDidMount(){
		var that = this;

		$.when(this.geoCode(this.state.geolocate)).done(function(data){
			console.log("data in location");
			console.log(data);
			that.setState({location: data.formatted_address});
		})

	}

/* 
*
* Create a geocode object and translate our geolocate object into a specific location with the google maps API
*
*/ 
	geoCode(geolocate_coords){

		 var deferred = $.Deferred();

	     var geocoder = new google.maps.Geocoder();     

        return $.Deferred(function(def){

        			geocoder.geocode({'latLng': geolocate_coords}, function(results, status) {
                    
                    if (status == google.maps.GeocoderStatus.OK) {
                   
                          	def.resolve(results[4]);

                     	} else {
                     		def.reject(new Error(status));
                     	}  
                 });    

  			}).promise();

        }



	render(){

		if(this.state.location){
		return( 
				<div> {this.state.location} </div>
			)
		}else {
			 	return (
			 		<Loader show={true} message={''}  backgroundStyle={{backgroundColor: 'black'}}>
			 		<div style={this.styles}> </div>
			 		</Loader>
			 		)
			 }

	}
}

