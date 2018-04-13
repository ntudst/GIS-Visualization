var BuildingModel = {
	id: "buildings",
	label: "Buildings",
	url: "https://raw.githubusercontent.com/michaelhoanglong/GIS-Visualization/master/geojson/building.geojson",
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
				result = LayerModel.formatYear(result,BuildingModel.id);
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
					Others: {
						data: {
							crs: result.crs,
							features: [],
							type: result.type,
						},
						color: BuildingModel.color
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