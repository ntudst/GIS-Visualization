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
    		var structureList = [];
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
				    				if(yearList.indexOf(constructionYear) == -1 && constructionYear != null && constructionYear != "null" && constructionYear != "NA"){
				    					// console.log(layerName + " : " + constructionYear);
				    					yearList.push(constructionYear);
				    				}
				    			}
			    				// Build Structure Type List
			    				var subType = String(dataObject["source"]["data"].features[k].properties.Sub_type);
			    				if(subType != undefined){
			    					if(structureList.indexOf(subType) == -1){
			    						structureList.push(subType);
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
	    	console.log(yearList);
    		console.log(structureList);
    		console.log(reignList);
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
    			var layerDetail = layerList[i]; //layerDetail = {layerName : [layer_id]}
    			var layerName = Object.keys(layerDetail)[0];
	    		var activeLayers = MapboxController.buildLayerSelector(layerDetail, layerToBeHide, map);
	    		if(layerName == "buildings" || layerName == "walls"){
	    			MapboxController.buildFilterOption(yearList, layerName, "alt-constr-date", map);
	    			MapboxController.buildFilterOption(structureList, layerName, "sub-type", map);
	    			MapboxController.buildFilterOption(reignList, layerName, "constr-reign", map);
	    		}
	    	};
	    	MapboxController.resizeViewPort();
	    });
	},
	buildLayerSelector: function(layerDetail, layerToBeHide, map){
		//layerDetail = {layerName : [layer_id]}
		var  layerName = Object.keys(layerDetail)[0];
		var layerIDlist = layerDetail[layerName];
		console.log("layerIDlist");
		console.log(layerIDlist);
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
	},
	buildFilterOption: function(dataList, layerName, selectID, map){
		for(var i=0; i<dataList.length; i++){
			var option = $("<option></option>").val(dataList[i]).text(dataList[i]);
			if($("option[value='"+option.val()+"']").val() == undefined){
				$("#"+selectID).append(option);
			}
		}
		$("#"+selectID).SumoSelect({
			floatWidth: 200
		});
		MapboxController.onFilterSelect(selectID, layerName, map);
	},
	resizeViewPort: function(){
		// resize map on viewport height changes
		console.log("check");
    	$(window).on('resize', function(){
			var viewportHeight = $(window).height() - parseFloat($("#main-footer").css('height')) - parseFloat($("#main-header").css('height')) - parseFloat($("#wpadminbar").css('height'));
			$(".map-container").css('height',viewportHeight);
    		map.resize();
		});
	},
	onFilterSelect: function(selectID, layerName, map){
		$("#"+selectID).on("change",function(){
			var value = $(this).val();
			var activeLayer = "a[name='" + layerName + "']";
			if($(activeLayer).prop("class") == "active"){
				console.log($(activeLayer).prop("data"));
			}
		});
	},
};