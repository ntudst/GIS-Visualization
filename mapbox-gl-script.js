var mapbox = function(){
	var layers = 
				{
					lakes: "https://drive.google.com/uc?export=download&id=1bft8MuPjR5cTcyq2LRTi6smjrmCZdNSn",
					buildings: "https://drive.google.com/uc?export=download&id=1ckKWQo26TGg4tWpvtET9_GiEWyDSYugt",
					islands: "https://drive.google.com/uc?export=download&id=1uP1VuX2ccyOqtuIqxXrouQ5m8rPLP81p",
					perimeterwalls: null,
					rockeries: null,
					scenicarea: null,
					streams: null,
					walls: null,
					waterfeature: null
				};
	
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
    	for(var layerName in layers){
    		var dataUrl = layers[layerName];
    		if(layerName == "buildings" && dataUrl != null){
    			$.getJSON(dataUrl,{
    				tag: "GeoJsonData",
    				tagmode: "any",
    				format: "json",
    			}).done(function(data){
    				console.log(data)
    			})
    		}
    	}
    });
}
$(document).ready(function(){
	console.log("hello console");
	mapbox();
});