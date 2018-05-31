var WallModel = {
	id: "walls",
	label: "Walls",
	url: "https://cdn.jsdelivr.net/gh/ntudst/GIS-Visualization@1.2/geojson/walls.geojson",
	data: [],
	color: "#7A7A7A",
	linewidth: 1.5,
	type: "line",

	loadData: function(){
		var layerData = this.data;
		$.ajax({
			type: "GET",
			url: WallModel.url,
			async: false,
			dataType: "json",
			success: function(result){
				// result = ModelManager.formatYear(result,WallModel.id);
				// Because Mapbox filter function only takes in String or number to compare, 
				// we cannot have null data for the features.
				result = ModelManager.formatNullData(result);
				var layerTemplate = {
					'id': WallModel.id,
					'type': WallModel.type,
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
						color: WallModel.color
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
					// Creating styles for the layers
					var layer = JSON.parse(JSON.stringify(layerTemplate));
					layer.id = WallModel.id+"_"+dataName;
					layer.source.data = dataObject.data;
					layer['layout'] = {
						'line-join': 'round',
						'line-cap': 'round'
					};
					layer['paint'] = {
						'line-color': dataObject.color,
						'line-width': WallModel.linewidth
					};
					layerData.push(layer);
				});
			}
		});
		this.data = layerData;
		return layerData;
	},
}