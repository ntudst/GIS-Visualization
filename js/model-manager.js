var ModelManager = {
	minYear: "1703",
	layerData: {},

	layerData: {
		contours: {
			data: null,
			label: null,
		},
		lakes: {
			data: null,
			label: null,
		},
		islands: {
			data: null,
			label: null,
		},
		perimeterwalls: {
			data: null,
			label: null,
		},
		streams: {
			data: null,
			label: null,
		},	
		walls: {
			data: null,
			label: null,
		},
		buildings: {
			data: null,
			label: null,
		},
		waterfeatures: {
			data: null,
			label: null,
		},
		scenicareas: {
			data: null,
			label: null,
		},
		rockeries: {
			data: null,
			label: null,
		},
	},

	loadData: function(){
		this.layerData[ContourModel.id]["data"] = ContourModel.loadData();
		this.layerData[ContourModel.id]["label"] = ContourModel.label;
		this.layerData[LakeModel.id]["data"] = LakeModel.loadData();
		this.layerData[LakeModel.id]["label"] = LakeModel.label;
		this.layerData[IslandModel.id]["data"] = IslandModel.loadData();
		this.layerData[IslandModel.id]["label"] = IslandModel.label;
		this.layerData[PerimeterwallModel.id]["data"] = PerimeterwallModel.loadData();
		this.layerData[PerimeterwallModel.id]["label"] = PerimeterwallModel.label;
		this.layerData[StreamModel.id]["data"] = StreamModel.loadData();
		this.layerData[StreamModel.id]["label"] = StreamModel.label;
		this.layerData[WallModel.id]["data"] = WallModel.loadData();
		this.layerData[WallModel.id]["label"] = WallModel.label;
		this.layerData[BuildingModel.id]["data"] = BuildingModel.loadData();
		this.layerData[BuildingModel.id]["label"] = BuildingModel.label;
		this.layerData[WaterfeatureModel.id]["data"] = WaterfeatureModel.loadData();
		this.layerData[WaterfeatureModel.id]["label"] = WaterfeatureModel.label;
		this.layerData[ScenicareaModel.id]["data"] = ScenicareaModel.loadData();
		this.layerData[ScenicareaModel.id]["label"] = ScenicareaModel.label;
		this.layerData[RockerieModel.id]["data"] = RockerieModel.loadData();
		this.layerData[RockerieModel.id]["label"] = RockerieModel.label;
		return this.layerData;
	},

	formatYear: function(geoJsonData,layerName){
		var minYear = this.minYear;
		// yearRegex1 tests for year in format '1990-2000'
		var yearRegex1 = new RegExp("[0-9]*[0-9]-[0-9]*[0-9]");
		// yearRegex2 tests for year in format 'before 1990';
		var yearRegex2 = new RegExp("[b|B]efore [0-9]*[0-9]");
		// yearRegex3 test for year in format '1751?'
		var yearRegex3 = new RegExp("[0-9]*[0-9][?]");
		// yearRegex4 test for year in format '1775, 1760'
		var yearRegex4 = new RegExp("[0-9]*[0-9], [0-9]*[0-9]");
		for(var i=0; i < geoJsonData.features.length; i++){
			if(geoJsonData.features[i].properties.YR_CNSTR_C != undefined && geoJsonData.features[i].properties.YR_CNSTR_C != "NA"){
				if(yearRegex1.test(geoJsonData.features[i].properties.YR_CNSTR_C)){
					var string = geoJsonData.features[i].properties.YR_CNSTR_C;
					geoJsonData.features[i].properties.YR_CNSTR_C = string.replace(new RegExp("[0-9]*[0-9]-"),"");
				}
				if(yearRegex2.test(geoJsonData.features[i].properties.YR_CNSTR_C)){
					var string = geoJsonData.features[i].properties.YR_CNSTR_C;
					geoJsonData.features[i].properties.YR_CNSTR_C = string.replace(new RegExp("[b|B]efore "),"");
				}
				if(yearRegex3.test(geoJsonData.features[i].properties.YR_CNSTR_C)){
					var string = geoJsonData.features[i].properties.YR_CNSTR_C;
					geoJsonData.features[i].properties.YR_CNSTR_C = string.replace(new RegExp("[?]"),"");
				}
				if(yearRegex4.test(geoJsonData.features[i].properties.YR_CNSTR_C)){
					var string = geoJsonData.features[i].properties.YR_CNSTR_C;
					geoJsonData.features[i].properties.YR_CNSTR_C = string.replace(new RegExp(", [0-9]*[0-9]"),"");
				}
			}
			else{
				if(layerName == "contours" || layerName == "lakes" || layerName == "islands" || layerName == "streams"){
					geoJsonData.features[i].properties.YR_CNSTR_C = String(minYear - 1);
				}
				else{
					geoJsonData.features[i].properties.YR_CNSTR_C = minYear;
				}
			}
		}
		return geoJsonData;
	},

	formatNullData: function(geoJsonData){
		// Because Mapbox filter function only takes in String or number to compare, 
		// we cannot have null data for the features.
		for(var i=0; i < geoJsonData.features.length; i++){
			var properties = geoJsonData.features[i].properties;
			$.each(properties, function(key,value){
				if(value == null){
					geoJsonData.features[i].properties[key] = "null";
				}
			});
		}
		return geoJsonData;
	},
};


