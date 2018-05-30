var FilterController = {
	getFilterSelectionList: function(){
		var filters = {};
		$(".selection").each(function(key,value){
			// refer to the main.html to view the selection tag details
			// value is the select tag details
			// name is name of the select tag and id is the id of the select tag
			filters[value.name] = value.id;
		});
		return filters;
	},
	buildFilterOption: function(selectID, dataList, displayList){
		dataList = dataList.sort();
		displayList = displayList.sort();
		for(var i=0; i<dataList.length; i++){
			var option = $("<option></option>").val(dataList[i]).text(displayList[i]);
			if($("#"+selectID+" option[value='"+option.val()+"']").val() == undefined){
				$("#"+selectID).append(option);
			}
		}
		$("#"+selectID).SumoSelect({
			search: true,
			searchText: 'Enter Here...',
			floatWidth: 200
		});
	},
	onFilterSelected: function(filterSelectionList, layerTobeFilterList, map){
		$.each(filterSelectionList, function(filterName, filterID){
			console.log("count");
			$("#"+filterID).on("change",function(){
				// Check if the layer for building or wall is selected
				layerTobeFilterList.forEach(function(layerName){
					var activeLayer = "a[name='" + layerName + "']";
					if($(activeLayer).prop("class") == "active"){
						var layerIDList = $(activeLayer).prop("data");
						var filterRule = ["all"];
						$.each(filterSelectionList, function(filterName, filterID){
							var optionValueList = $("#"+filterID).val()
							if(optionValueList.length == 0){
								optionValueList = FilterController.getAllFilterOptions(filterID);
							}
							filterRule.push(["match",["get",filterID],optionValueList,true,false]);
						})
						layerIDList.forEach(function(layerID){
							map.setFilter(layerID, filterRule);
						});
					}
				});
			});
		});
	},
	getAllFilterOptions: function(filterID){
		var filterOptions = [];
		$("#"+filterID+" option").each(function(key, optionObject){
			filterOptions.push(optionObject.value);
		});
		return filterOptions;
	},
	setClearAllEvent: function(filterSelectionList){
		$("#clearButton").on("click",function(event){
			$.each(filterSelectionList, function(filterName, filterID){
				console.log(1);
				$("#"+filterID)[0].sumo.unSelectAll();
			});
		});
	},
	buildStructureListForFilterDisplay: function(structureObjects){
		var structureList = [];
		$.each(structureObjects, function(structureName, count){
			var name = structureName + " " + "(" + count + ")";
			structureList.push(name);
		});
		return structureList;
	},

	resizeFilter: function(){
		var mapHeight = parseFloat($("#map").css("height"));
		var filterHeight = parseFloat($("#map-filter").css("height"));
		var legendHeight = parseFloat($("#map-legend").css("height"));
		if(filterHeight > mapHeight - legendHeight){
			$("#filter-content").css("overflow-y", "auto");
			$("#filter-content").css("max-height", mapHeight - 150);
		}
		$("#map-filter").on('change', function(){
			var mapHeight = parseFloat($("#map").css("height"));
			var filterHeaderHeight = parseFloat($("#filter-header").css("height"));
			var filterHeight = parseFloat($("#filter-content").css("max-height"));
			var maxLayerBarHeight = filterHeight + filterHeaderHeight;
			var legendHeight = parseFloat($("#map-legend").css("height"));
			if(maxLayerBarHeight > mapHeight - legendHeight){
				filterHeight = mapHeight - 150;
			}
			$("#filter-content").css("overflow-y", "auto");
			$("#filter-content").css("height", filterHeight);
		});
	},
};