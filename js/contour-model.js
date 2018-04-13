var ContourModel = {
	id: "contours",
	label: "Contours",
	url: "https://raw.githubusercontent.com/michaelhoanglong/GIS-Visualization/master/geojson/alos-ctr10-smooth.geojson",
	data: [],
	color: "#a1dab4",
	linewidth: 2,
	type: "line",

	loadData: function(){
		var layerData = this.data;
		$.ajax({
			type: "GET",
			url: ContourModel.url,
			async: false,
			dataType: "json",
			success: function(result){
				result = LayerModel.formatYear(result,ContourModel.id);
				var layerTemplate = {
					'id': ContourModel.id,
					'type': ContourModel.type,
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
					'line-color': ContourModel.color,
					'line-width': ContourModel.linewidth
				};
				layerData.push(layerTemplate);
			}
		});
		this.data = layerData;
		return layerData;
	},
}