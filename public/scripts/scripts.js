

		
      	if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {

                  var lat = position.coords.latitude, 
                  	  long = position.coords.longitude,
                      geocoder = new google.maps.Geocoder(),      
                  	  geolocate = new google.maps.LatLng(lat, long);



                  

                  geocoder.geocode({'latLng': geolocate}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                       var result;


                       if (results.length > 1) {
                         result = results[1];
                       } else {
                         result = results[0];
                       }
                       console.log(results);
                         console.log(result);

                       
                       var city = result.address_components[2].long_name,
                           state = result.address_components[3].long_name;

                     }  
                  });    


                var api_key = 'ee2ac15f04e14b6646dc6508f06d7532';
				var coords = lat + "," + long;
			// var coordinates  = '38.9071,-77.0368';

				$.ajax({
					  url: "https://api.darksky.net/forecast/" + api_key + "/" + coords,
					  dataType: "jsonp"
					}).done(function(data){
						console.log("data!");
					  	console.log(data);
					  	$("body").append("<div>" + data.currently.temperature + "</div>");
					  		  	$("body").append("<div>" + data.currently.summary + "</div>");




                });




});





                }



  		
	


