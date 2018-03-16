var MapboxController = {
	filterBy : function(map,layerID,filterProperty,input){
		var filters = ["<=",filterProperty,input];
		map.setFilter(layerID,filters);
		$("#year").text(input);
		return map;
	},
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
    		var yearList = [];
    		var filterProperty = 'YR_CNSTR_C';
	    	$.each(data, function(layerName,layerObject){
	    		if(layerObject["data"] != null){
    				layerList.push(layerName);
	    			map.addLayer(layerObject["data"]);
	    			var constructionYear = layerObject["data"]["source"]["data"].features[0].properties.YR_CNSTR_C;
	    			if(constructionYear != undefined){
	    				console.log(layerName + " : " + constructionYear);
	    				if(yearList.indexOf(constructionYear) == -1){
	    					yearList.push(constructionYear);
	    				}
	    			}
	    		}
	    	});
	    	// sort year list and update the max length of the slider
	    	yearList = yearList.sort();
	    	$("#timeSlider").attr("max",yearList.length-1);
	    	$("#timeSlider").on("change",function(e){
	    		var yearIndex = parseInt(e.target.value, 10);
	    		$.each(data, function(layerName,layerObject){
	    			MapboxController.filterBy(map,layerName,filterProperty,yearList[yearIndex]);
	    		});
	    	});

	    	// Set click to view by layer
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