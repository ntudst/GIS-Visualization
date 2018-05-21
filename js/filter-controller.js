var FilterController = {
	getFilterSelectionList: function(){
		var filters = {};
		$(".selection").each(function(key,value){
			filters[value.name] = value.id;
		});
		return filters;
	},
	buildFilterOption: function(dataList, layerName, selectID, filterList, map){
		dataList = dataList.sort();
		for(var i=0; i<dataList.length; i++){
			var option = $("<option></option>").val(dataList[i]).text(dataList[i]);
			if($("option[value='"+option.val()+"']").val() == undefined){
				$("#"+selectID).append(option);
			}
		}
		$("#"+selectID).SumoSelect({
			search: true,
			searchText: 'Enter Here...',
			floatWidth: 200
		});
		FilterController.onFilterSelect(selectID, filterList, layerName, map);
	},
	onFilterSelect: function(selectID, filterList, layerName, map){
		$("#"+selectID).on("change",function(){
			// Check if the layer for building or wall is selected
			var activeLayer = "a[name='" + layerName + "']";
			if($(activeLayer).prop("class") == "active"){
				var layerIDList = $(activeLayer).prop("data");
				var filterRule = ["all"];
				$.each(filterList, function(filterName, filterID){
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
};