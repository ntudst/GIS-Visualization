var MapboxController = {
	constructFilterRule : function(filterRule,filterProperty,input){
		var filterRule = [filterRule,filterProperty,input];
		return filterRule;
	},
	filterBy : function(map,filterRule,layerID,input){
		var filters = filterRule;
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
	    			for (var i = 0; i<layerObject["data"]["source"]["data"].features.length;i++){
	    				var constructionYear = String(layerObject["data"]["source"]["data"].features[i].properties.YR_CNSTR_C);
		    			if(constructionYear != undefined){
		    				if(yearList.indexOf(constructionYear) == -1 && constructionYear >= LayerModel.minYear){
		    					// console.log(layerName + " : " + constructionYear);
		    					yearList.push(constructionYear);

		    				}
		    			}
	    			}
	    		}
	    	});
	    	// sort year list and update the max length of the slider
	    	yearList = yearList.sort();
	    	// console.log(yearList);
    		var baseYear = "Before" + " " + LayerModel.minYear;
	    	yearList.unshift(baseYear);
	    	$("#timeSlider").attr("max",yearList.length-1);
	    	$("#timeSlider").on("change",function(e){
	    		var yearIndex = parseInt(e.target.value, 10);
	    		$.each(data, function(layerName,layerObject){
	    			if(yearList[yearIndex] != baseYear){
	    				var filterRule = MapboxController.constructFilterRule("<=",filterProperty,yearList[yearIndex]);
	    				MapboxController.filterBy(map,filterRule,layerName,yearList[yearIndex]);
	    			}
	    			else{
	    				var filterRule = MapboxController.constructFilterRule("<",filterProperty,yearList[yearIndex+1]);
	    				MapboxController.filterBy(map,filterRule,layerName,yearList[yearIndex]);
	    			}
	    		});
	    	});
	    	// Set up default slider to be the maximum
	    	$("#timeSlider").attr("value",yearList.length-1);
	    	$("#timeSlider").trigger("change");
	   //  	$.each(data, function(layerName,layerObject){
	   //  		var filterRule = MapboxController.constructFilterRule("<=",filterProperty,yearList[yearList.length-1]);
				// MapboxController.filterBy(map,filterRule,layerName,yearList[yearList.length-1]);
    // 		});
	    	
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