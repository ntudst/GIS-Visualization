var LayerModel = {
	minYear: "1703",
	layerData: {
		contours: {
			label: "Contours",
			url: "https://raw.githubusercontent.com/michaelhoanglong/GIS-Visualization/master/geojson/alos-ctr10-smooth.geojson",
			data: null,
			color: "#a1dab4",
			linewidth: 2,
			type: "line"
		},
		lakes: {
			label: "Lakes",
			url: "https://raw.githubusercontent.com/michaelhoanglong/GIS-Visualization/master/geojson/lakes.geojson",
			data: null,
			color: "#92C5D8",
			opacity: 0.6,
			type: "fill"		
		},
		islands: {
			label: "Islands",
			url: "https://raw.githubusercontent.com/michaelhoanglong/GIS-Visualization/master/geojson/Islands.geojson",
			data: null,
			color: "#FFFFFF",
			opacity: 0.6,
			type: "fill"		
		},
		perimeterwalls: {
			label: "Perimeter Walls",
			url: "https://raw.githubusercontent.com/michaelhoanglong/GIS-Visualization/master/geojson/perimeter-wall.geojson",
			data: null,
			color: "#fed976",
			linewidth: 3,
			type: "line"		
		},
		streams: {
			label: "Streams",
			url: "https://raw.githubusercontent.com/michaelhoanglong/GIS-Visualization/master/geojson/streams.geojson",
			data: null,
			color: "#41b6c4",
			linewidth: 3,
			type: "line"		
		},	
		walls: {
			label: "Walls",
			url: "https://raw.githubusercontent.com/michaelhoanglong/GIS-Visualization/master/geojson/walls.geojson",
			data: null,
			color: "#7A7A7A",
			linewidth: 2,
			type: "line"		
		},
		buildings: {
			label: "Buildings",
			url: "https://raw.githubusercontent.com/michaelhoanglong/GIS-Visualization/master/geojson/building.geojson",
			data: null,
			color: "#F26666",
			opacity: 1.0,
			type: "fill"		
		},
		waterfeature: {
			label: "Water Features",
			url: "https://raw.githubusercontent.com/michaelhoanglong/GIS-Visualization/master/geojson/water-features.geojson",
			data: null,
			opacity: 0.6,
			type: "symbol",
			icon: "park-15"		
		},
		scenicarea: {
			label: "Scenic Areas",
			url: "https://raw.githubusercontent.com/michaelhoanglong/GIS-Visualization/master/geojson/scenic-area.geojson",
			data: null,
			opacity: 0.6,
			type: "symbol",
			icon: "monument-15"		
		},
		rockeries: {
			label: "Rockeries",
			url: "https://raw.githubusercontent.com/michaelhoanglong/GIS-Visualization/master/geojson/rockeries.geojson",
			data: null,
			opacity: 0.6,
			type: "symbol",
			icon: "mountain-15"		
		},
	},
	loadData: function(){
		var layerData = this.layerData;
		for(var layerName in layerData){
			if(layerData[layerName] != null){
				if(layerData[layerName]["url"] != null && layerData[layerName]["data"] == null){
					$.ajax({
						type: "GET",
						url: layerData[layerName]["url"],
						async: false,
						dataType: "json",
						success: function(result){
							result = LayerModel.formatYear(result,layerName);
							var layerTemplate = {
								'id': layerName,
								'type': layerData[layerName]["type"],
								'source': {
									'type': 'geojson',
									'data': result, 
								}
							};
							if(layerName == 'buildings' || layerName == 'walls'){
								console.log(result);
							}
							// Creating styles for the layers
							var typeOfLayerData = layerData[layerName]["type"]
							if(typeOfLayerData == "fill"){
								layerTemplate['layout'] 
								layerTemplate['paint'] = {
									'fill-color': layerData[layerName]["color"],
									'fill-opacity': layerData[layerName]["opacity"]
								};
							}
							else if(typeOfLayerData == "line"){
								layerTemplate['layout'] = {
									'line-join': 'round',
									'line-cap': 'round'
								};
								layerTemplate['paint'] = {
									'line-color': layerData[layerName]["color"],
									'line-width': layerData[layerName]["linewidth"]
								};
							}
							else{
								layerTemplate['layout'] = {
									"icon-image": layerData[layerName]["icon"],
									"icon-size": 1,
						            "text-field": "{Name}",
						            "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
						            "text-offset": [0, 0.6],
						            "text-anchor": "top",
						            "text-size": 12,
								};
							}
							layerData[layerName]["data"] = layerTemplate;
						}
					});
				}
			}
		}
		this.layerData = layerData;
		return layerData;
	},
	formatYear: function(geoJsonData,layerName){
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
					geoJsonData.features[i].properties.YR_CNSTR_C = String(LayerModel.minYear - 1);
				}
				else{
					geoJsonData.features[i].properties.YR_CNSTR_C = LayerModel.minYear;
				}
			}
		}
		return geoJsonData;
	},
};


