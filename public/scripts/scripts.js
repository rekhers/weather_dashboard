

		/*
		*
		* Currently nesting the Darksky API call and Geocoder inside this async Navigator callback as both
		* depend on the position data -- need to look into if chaining / using jQuery deferred maybe preferential
		*
		*/

      	if(navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {


                /*
				*	grab the lat, long from the async navigator interface position object 
				*	and feed into google maps' geolocate object
				*/
                  var lat = position.coords.latitude, 
                  	  long = position.coords.longitude,
                  	  coords = lat + "," + long,
                      geocoder = new google.maps.Geocoder(),      
                  	  geolocate = new google.maps.LatLng(lat, long);


                  /* 
                  *
                  * Use the geocode method to convert our Geolocate object into a specific location
                  *
                  */ 
                  geocoder.geocode({'latLng': geolocate}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK) {
                     

                       var city = results[4].address_components[0].long_name,
                           state = results[4].address_components[1].long_name;

                           console.log(city);
                           console.log(state);

                     	}  
                  	});    

                var api_key = 'ee2ac15f04e14b6646dc6508f06d7532';

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


               var word = "orange";


        $.get(
    'https://de.wikipedia.org/w/api.php?action=parse&format=json&prop=text&section=0&page=' + word + '&callback=?',
    function (response) {
        var resp = $.parseJSON(response);
        var text = resp.parse.text['*'];
        re = /img.*?src="(.*?)"/g
        while( match = re.exec(text)) { 
        	console.log("wikie");
        	console.log(response);
           console.log(match[1]); 
        }
});



  		
	


