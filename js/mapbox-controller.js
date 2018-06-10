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
		mapboxgl.accessToken = 'pk.eyJ1IjoibnR1ZHN0IiwiYSI6ImNqaHU1ZHo0ZzA2cXkzcnBpeWJvYzc0NGoifQ.JAuM_DaDAERDtX1tRRZs4w';
		var map = new mapboxgl.Map({
			container: 'map',
			style: 'mapbox://styles/mapbox/satellite-v9',
	        center: [117.937161807951327, 40.987545620561846],
	        zoom: 17
	    });

	    map.on('load', function(){
    		var layerList = []; //[{layerName: [layer_id]}]
    		var yearList = [];
    		var structureList = [];
    		var structureDisplayList = [];
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
			    				var constructionYear = String(dataObject["source"]["data"].features[k].properties.constr_date);
			    				if(constructionYear == undefined){
				    				constructionYear = String(dataObject["source"]["data"].features[k].properties.constr_date_cbs);
			    				}
				    			if(constructionYear != undefined){
				    				if(yearList.indexOf(constructionYear) == -1){
				    					// console.log(layerName + " : " + constructionYear);
				    					yearList.push(constructionYear);
				    				}
				    			}
			    				// Build Structure Type List
			    				var subType = String(dataObject["source"]["data"].features[k].properties.typology_sub_type);
			    				if(subType != undefined){
			    					if(structureList.indexOf(subType) == -1){
			    						structureList.push(subType);
			    					}
			    					// Build objects contain building name and count
			    					// This structureObjects is then used to build the the displaytext for the structure filter.
			    					if(structureObjects[subType] == undefined){
			    						structureObjects[subType] = 1;
			    					}
			    					else{
			    						structureObjects[subType] = structureObjects[subType] + 1;
			    					}
			    				}
			    				// Build Reign List
			    				var reign = String(dataObject["source"]["data"].features[k].properties.constr_reign);
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
	    	structureDisplayList = FilterController.buildStructureListForFilterDisplay(structureObjects);
	    	// console.log(layerList);
	    	// console.log(structureDisplayList);
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
			var layerTobeFilterList = ["buildings","walls"];
    		for(var i = layerList.length-1; i >= 0; i--){
    			var layerDetail = layerList[i]; //layerDetail = {layerName : [layer_id]}
    			var layerName = Object.keys(layerDetail)[0];
	    		var activeLayers = LayerController.buildLayerSelector(layerDetail, layerToBeHide, map);
	    		if(layerTobeFilterList.indexOf(layerName) != -1){
	    			FilterController.buildFilterOption(filterSelectionList.yearFilter, yearList, yearList);
	    			FilterController.buildFilterOption(filterSelectionList.structureFilter, structureList, structureDisplayList);
	    			FilterController.buildFilterOption(filterSelectionList.reignFilter, reignList, reignList);
	    		}
	    		if(layerName == "buildings"){
	    			ModalBoxController.onBuildingSelected(layerDetail[layerName], map);
	    		}
	    	};
	    	FilterController.onFilterSelected(filterSelectionList, layerTobeFilterList, map);
	    	FilterController.setClearAllEvent(filterSelectionList);
	    	MapboxController.resizeViewPort(map);
	    	LayerController.resizeLayerSideBar();
	    	FilterController.resizeFilter();
	    	MapboxController.toggleMapFunction();
	    });
	},
	resizeViewPort: function(map){
		// resize map on viewport height changes
		var viewportHeight = parseFloat(window.innerHeight) - parseFloat($("#main-footer").css('height')) - parseFloat($("#main-header").css('height')) - parseFloat($("#wpadminbar").css('height'));
		if(isNaN(viewportHeight)){
			viewportHeight = window.innerHeight;
		}
		$(".map-container").css('height',viewportHeight);
		map.resize();
    	$(window).on('resize', function(){
			var viewportHeight = window.innerHeight - parseFloat($("#main-footer").css('height')) - parseFloat($("#main-header").css('height')) - parseFloat($("#wpadminbar").css('height'));
			if(isNaN(viewportHeight)){
				viewportHeight = window.innerHeight;
			}
			$(".map-container").css('height',viewportHeight);
    		map.resize();
    		$("#map-layer").trigger("change");
			$("#map-filter").trigger("change");
		});
	},

	toggleMapFunction: function(){
		$("#layer-header").on("click", function(){
			$("#layer-content").toggle();
			$("#map-layer").trigger("change");
		});
		$("#filter-header").on("click", function(){
			$("#filter-content").toggle();
			$("#map-filter").trigger("change");
		});
		$("#legend-header").on("click", function(){
			$("#legend-content").toggle();
		});
	},

};
