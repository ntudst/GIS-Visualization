var MapboxController = {
	// constructFilterRule : function(filterRule,filterProperty,input){
	// 	var filterRule = [filterRule,filterProperty,input];
	// 	return filterRule;
	// },
	filterBy : function(map,filterRule,layerID){
		var filters = filterRule;
		map.setFilter(layerID,filters);
		return map;
	},
	loadMap: function(data){
		mapboxgl.accessToken = 'pk.eyJ1IjoibWljaGFlbC1sZTYxMSIsImEiOiJjamRmZTNmajMwNnd5MzJtZnN2YzVoMHppIn0.18MD1NJSx8CW2IvOb9VKIw';
		var map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/basic-v9',
	        center: [117.937161807951327, 40.987545620561846],
	        zoom: 17
	    });

	    map.on('load', function(){
    		var layerList = []; //[{layerName: [layer_id]}]
    		var yearList = [];
    		var structureList = [];
    		var structureObjects = {}; 
    		var reignList = [];
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
		    			for (var k = 0; k<dataObject["source"]["data"].features.length;k++){
		    				if(layerName == "buildings" || layerName == "walls"){
			    				// Build Year List;
			    				var constructionYear = String(dataObject["source"]["data"].features[k].properties.Alt_Constr);
			    				if(constructionYear == undefined){
				    				constructionYear = String(dataObject["source"]["data"].features[k].properties.YR_CNSTR_C);
			    				}
				    			if(constructionYear != undefined){
				    				if(yearList.indexOf(constructionYear) == -1){
				    					// console.log(layerName + " : " + constructionYear);
				    					yearList.push(constructionYear);
				    				}
				    			}
			    				// Build Structure Type List
			    				var subType = String(dataObject["source"]["data"].features[k].properties.Sub_type);
			    				if(subType != undefined){
			    					if(structureObjects[subType] == undefined){
			    						structureObjects[subType] = 1;
			    					}
			    					else{
			    						structureObjects[subType] = structureObjects[subType] + 1;
			    					}
			    				}
			    				// Build Reign List
			    				var reign = String(dataObject["source"]["data"].features[k].properties.Constr_Reign);
			    				if(reign != undefined){
			    					if(reignList.indexOf(reign) == -1){
			    						reignList.push(reign);
			    					}
			    				}
			    			}
		    			}

	    			}
	    		}
	    		layerList.push(layer);
	    	});
	    	structureList = FilterController.buildStructureListForFilterDisplay(structureObjects);
	    	// console.log(layerList);
	    	// console.log(structureList);
	    	// // sort year list and update the max length of the slider
	    	// yearList = yearList.sort();
	    	// // console.log(yearList);
    		// var baseYear = "Before" + " " + ModelManager.minYear;
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
	    	
	    	// Set click to view by layer and select by filter
    		var layerToBeHide = ModelManager.layerData.contours.label;
			var filterSelectionList = FilterController.getFilterSelectionList();
    		for(var i = layerList.length-1; i >= 0; i--){
    			var layerDetail = layerList[i]; //layerDetail = {layerName : [layer_id]}
    			var layerName = Object.keys(layerDetail)[0];
	    		var activeLayers = LayerController.buildLayerSelector(layerDetail, layerToBeHide, map);
	    		if(layerName == "buildings" || layerName == "walls"){
	    			FilterController.buildFilterOption(yearList, layerName, filterSelectionList.yearFilter, filterSelectionList, map);
	    			FilterController.buildFilterOption(structureList, layerName, filterSelectionList.structureFilter, filterSelectionList, map);
	    			FilterController.buildFilterOption(reignList, layerName, filterSelectionList.reignFilter, filterSelectionList, map);
	    		}
	    		if(layerName == "buildings"){
	    			ModalBoxController.onBuildingSelected(layerDetail[layerName], map);
	    		}
	    	};
	    	FilterController.setClearAllEvent(filterSelectionList);
	    	MapboxController.resizeViewPort(map);
	    });
	},
	resizeViewPort: function(map){
		// resize map on viewport height changes
    	$(window).on('resize', function(){
			var viewportHeight = $(window).height() - parseFloat($("#main-footer").css('height')) - parseFloat($("#main-header").css('height')) - parseFloat($("#wpadminbar").css('height'));
			$(".map-container").css('height',viewportHeight);
    		map.resize();
		});
	},
	
};