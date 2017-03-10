
/*
*
*  Set timeout to 5 seconds if deferred object doesn't get resolved 
*
*/

var getLocation = function(){

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

var geoCode = function(geolocate_coords){

	     var geocoder = new google.maps.Geocoder();     


             geocoder.geocode({'latLng': geolocate_coords}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                   
                    var city = results[4].address_components[0].long_name,
                           state = results[4].address_components[1].long_name;

                           console.log("helllooo");

                           console.log(city);
                           console.log(state);

                     	}  
                  	});    

  

              }

/* 
*
* Get weather data from DarkSky API based on current location from the Navigator instance
*
*/ 
var getWeather = function(coords){

	        var api_key = 'ee2ac15f04e14b6646dc6508f06d7532';


			return $.ajax({
					  url: "https://api.darksky.net/forecast/" + api_key + "/" + coords,
					  dataType: "jsonp"
					}).done(function(data){
						console.log("data!");
					  	console.log(data);
					  	$("body").append("<div>" + data.currently.temperature + "</div>").append("<div>" + data.currently.summary + "</div>");
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
		 var lat = data.coords.latitude, 
                  	  long = data.coords.longitude,
                  	  coords = lat + "," + long,
                  	  geolocate = new google.maps.LatLng(lat, long);

		getWeather(coords);
		geoCode(geolocate);

	});



  		
	


