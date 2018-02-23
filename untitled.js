var mapbox = function(){
	var layerList = ["lakes","buildings","islands","perimeter-walls","rockeries","scenic-area","streams","walls","water-feature"];
	mapboxgl.accessToken = 'pk.eyJ1IjoibWljaGFlbC1sZTYxMSIsImEiOiJjamRmZTNmajMwNnd5MzJtZnN2YzVoMHppIn0.18MD1NJSx8CW2IvOb9VKIw';
	var map = new mapboxgl.Map({
		container: 'map',
		style: 'mapbox://styles/mapbox/streets-v9',
        // center: [-68.13734351262877, 45.137451890638886],
        center: [117.941106256349713, 41.004993254222228],
        zoom: 12
        // zoom: 5
    });

    map.on('load',function(){
    	for(var i = 0; i < layerList.Length(); i++){
    		console.log(layerList[i]);
    	}
    });
}
$(document).ready(function(){
	console.log("hello console");
	mapbox();
});