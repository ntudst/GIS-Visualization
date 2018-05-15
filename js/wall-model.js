var WallModel = {
	id: "walls",
	label: "Walls",
	url: "https://raw.githubusercontent.com/michaelhoanglong/GIS-Visualization/master/geojson/walls.geojson",
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
				// result = LayerModel.formatYear(result,WallModel.id);
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
					Others: {
						data: {
							crs: result.crs,
							features: [],
							type: result.type,
						},
						color: WallModel.color
					}
				}
				for(var i=0; i<result.features.length; i++){
					if(result.features[i].properties.Constr_Reign == "Kangxi"){
						data.Kangxi.data.features.push(result.features[i]);
					}
					else if(result.features[i].properties.Constr_Reign == "Qianlong"){
						data.Qianlong.data.features.push(result.features[i]);
					}
					else{
						data.Others.data.features.push(result.features[i]);
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