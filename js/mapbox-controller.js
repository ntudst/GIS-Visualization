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
			// style: 'mapbox://styles/mapbox/light-v9',
			// style: 'mapbox://styles/mapbox/streets-v9',
			style: 'mapbox://styles/mapbox/basic-v9',
	        // center: [117.93633,40.99902],
	        center: [117.937161807951327, 40.987545620561846],
	        // zoom: 13.2
	        zoom: 17
	        // zoom: 5
	    });
    	
	    map.on('load', function(){
    		var layerList = []; //[{layerName: [layer_id]}]
    		var yearList = [];
    		var filterProperty = 'YR_CNSTR_C';
	    	$.each(data, function(layerName,layerObject){
	    		// Build layer list for layer filter function later
				var layer = {};
				layer[layerName] = [];

	    		if(layerObject["data"].length != 0){
	    			for(var i = 0; i<layerObject.data.length; i++){
	    				var dataObject = layerObject.data[i];
		    			map.addLayer(dataObject);
		    			layer[layerName].push(dataObject.id);
		    			// for (var k = 0; k<dataObject["source"]["data"].features.length;k++){
		    			// 	var constructionYear = String(dataObject["source"]["data"].features[k].properties.YR_CNSTR_C);
			    		// 	if(constructionYear != undefined){
			    		// 		if(yearList.indexOf(constructionYear) == -1 && constructionYear >= LayerModel.minYear){
			    		// 			// console.log(layerName + " : " + constructionYear);
			    		// 			yearList.push(constructionYear);

			    		// 		}
			    		// 	}
		    			// }
	    			}
	    		}
	    		layerList.push(layer);
	    	});
	    	// // sort year list and update the max length of the slider
	    	// yearList = yearList.sort();
	    	// // console.log(yearList);
    		// var baseYear = "Before" + " " + LayerModel.minYear;
	    	// yearList.unshift(baseYear);
	    	// $("#timeSlider").attr("max",yearList.length-1);
	    	// $("#timeSlider").on("change",function(e){
	    	// 	var yearIndex = parseInt(e.target.value, 10);
	    	// 	$.each(data, function(layerName,layerObject){
	    	// 		if(yearList[yearIndex] != baseYear){
	    	// 			var filterRule = MapboxController.constructFilterRule("<=",filterProperty,yearList[yearIndex]);
	    	// 			MapboxController.filterBy(map,filterRule,layerName,yearList[yearIndex]);
	    	// 		}
	    	// 		else{
	    	// 			var filterRule = MapboxController.constructFilterRule("<",filterProperty,yearList[yearIndex+1]);
	    	// 			MapboxController.filterBy(map,filterRule,layerName,yearList[yearIndex]);
	    	// 		}
	    	// 	});
	    	// });
	    	// // Set up default slider to be the maximum
	    	// $("#timeSlider").attr("value",yearList.length-1);
	    	// $("#timeSlider").trigger("change");
	    	
	    	// Set click to view by layer
    		var layerToBeHide = LayerModel.layerData.contours.label;
    		for(var i = layerList.length-1; i >= 0; i--){
	    		var  layerName = Object.keys(layerList[i])[0];
	    		var layerIDlist = layerList[i][layerName];
	    		var link = document.createElement('a');
	    		link.name = layerName;
	    		link.href = '#';
	    		link.textContent = LayerModel.layerData[layerName].label;
    			link.className = 'active';
    			link.data = layerIDlist;
				if(link.textContent == layerToBeHide){
					link.data.forEach(function(id){
	    				map.setLayoutProperty(id, 'visibility', 'none');
					});
	    			link.className = '';
	    		}
	    		link.onclick = function(e){
	    			this.data.forEach(function(id){
	    				var selectedLayer = id;
		    			e.preventDefault();
		    			e.stopPropagation();

		    			var visibility = map.getLayoutProperty(selectedLayer, 'visibility');
		    			if(visibility === 'visible'){
		    				map.setLayoutProperty(selectedLayer, 'visibility', 'none');
		    			}
		    			else{
		    				map.setLayoutProperty(selectedLayer, 'visibility', 'visible');
		    			}
	    			});
	    			if(this.className === 'active'){
	    				this.className = '';
	    			}
	    			else{
	    				this.className = 'active';
	    			}
	    		}
	    		$('#menu').append(link);	
	    	};

	    	// resize map on viewport height changes
	    	$(window).on('resize', function(){
				var viewportHeight = $(window).height() - parseFloat($("#main-footer").css('height')) - parseFloat($("#main-header").css('height')) - parseFloat($("#wpadminbar").css('height'));
				$(".map-container").css('height',viewportHeight);
	    		map.resize();
	    		console.log("resize");
			});
	    });
	},
};