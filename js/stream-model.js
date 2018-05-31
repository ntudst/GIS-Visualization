var StreamModel = {
	id: "streams",
	label: "Streams",
	url: "https://cdn.jsdelivr.net/gh/ntudst/GIS-Visualization@1.3/geojson/streams.geojson",
	data: [],
	color: "#41b6c4",
	linewidth: 3,
	type: "line",

	loadData: function(){
		var layerData = this.data;
		$.ajax({
			type: "GET",
			url: StreamModel.url,
			async: false,
			dataType: "json",
			success: function(result){
				result = ModelManager.formatYear(result,StreamModel.id);
				var layerTemplate = {
					'id': StreamModel.id,
					'type': StreamModel.type,
					'source': {
						'type': 'geojson',
						'data': result, 
					}
				};
				
				// Creating styles for the layers
				layerTemplate['layout'] = {
					'line-join': 'round',
					'line-cap': 'round'
				};
				layerTemplate['paint'] = {
					'line-color': StreamModel.color,
					'line-width': StreamModel.linewidth
				};
				layerData.push(layerTemplate);
			}
		});
		this.data = layerData;
		return layerData;
	},
}