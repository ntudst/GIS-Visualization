var MapboxController = {
	loadMap: function(data){
		mapboxgl.accessToken = 'pk.eyJ1IjoibWljaGFlbC1sZTYxMSIsImEiOiJjamRmZTNmajMwNnd5MzJtZnN2YzVoMHppIn0.18MD1NJSx8CW2IvOb9VKIw';
		var map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/light-v9',
			// style: 'mapbox://styles/mapbox/streets-v9',
			// style: 'mapbox://styles/mapbox/basic-v9',
	        center: [117.93633,40.99902],
	        zoom: 13.2
	        // zoom: 5
	    });
    	
	    map.on('load', function(){
    		var layerList = [];
	    	$.each(data, function(layerName,layerObject){
	    		if(layerObject["data"] != null){
    				layerList.push(layerName);
	    			map.addLayer(layerObject["data"]);
	    		}
	    	});
    		for(var i = layerList.length-1; i >= 0; i--){
	    		var id = layerList[i];
	    		var link = document.createElement('a');
	    		link.href = '#';
	    		link.className = 'active';
	    		link.textContent = id;
	    		link.onclick = function(e){
	    			var selectedLayer = this.textContent;
	    			e.preventDefault();
	    			e.stopPropagation();

	    			var visibility = map.getLayoutProperty(selectedLayer, 'visibility');
	    			if(visibility === 'visible'){
	    				map.setLayoutProperty(selectedLayer, 'visibility', 'none');
	    				this.className = '';
	    			}
	    			else{
	    				this.className = 'active';
	    				map.setLayoutProperty(selectedLayer, 'visibility', 'visible');
	    			}
	    		}
	    		$('#menu').append(link);
	    	};
	    });
	},
};