var BuildingModel = {
	id: "buildings",
	label: "Buildings",
	url: "https://cdn.jsdelivr.net/gh/ntudst/GIS-Visualization@1.1/geojson/building.geojson",
	data: [],
	color: "#707070",
	opacity: 1.0,
	type: "fill",	

	loadData: function(){
		var layerData = this.data;
		$.ajax({
			type: "GET",
			url: BuildingModel.url,
			async: false,
			dataType: "json",
			success: function(result){
				// result = ModelManager.formatYear(result,BuildingModel.id);
				// Because Mapbox filter function only takes in String or number to compare, 
				// we cannot have null data for the features.
				result = ModelManager.formatNullData(result)
				var layerTemplate = {
					'id': null,
					'type': BuildingModel.type,
					'source': {
						'type': 'geojson',
						'data': result, 
					}
				};
				var data = {
					Kangxi: {
						data: {
							crs: result.crs,
							features: [],
							type: result.type,
						},
						color: "#8A2BE2"
					},
					Qianlong: {
						data: {
							crs: result.crs,
							features: [],
							type: result.type,
						},
						color: "#FF8C00"
					},
					Uncertain: {
						data: {
							crs: result.crs,
							features: [],
							type: result.type,
						},
						color: BuildingModel.color
					}
				}
				for(var i=0; i<result.features.length; i++){
					if(result.features[i].properties.constr_reign == "Kangxi"){
						data.Kangxi.data.features.push(result.features[i]);
					}
					else if(result.features[i].properties.constr_reign == "Qianlong"){
						data.Qianlong.data.features.push(result.features[i]);
					}
					else{
						data.Uncertain.data.features.push(result.features[i]);
					}
				}

				$.each(data, function(dataName, dataObject){
					var layer = JSON.parse(JSON.stringify(layerTemplate));
					layer.id = BuildingModel.id+"_"+dataName;
					layer.source.data = dataObject.data;
					layer['paint'] = {
						'fill-color': dataObject.color,
						'fill-opacity': BuildingModel.opacity
					};
					layerData.push(layer);
				});
			}
		});
		this.data = layerData;
		return layerData;
	},
}