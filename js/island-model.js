var IslandModel = {
	id: "islands",
	label: "Islands",
	url: "https://raw.githubusercontent.com/michaelhoanglong/GIS-Visualization/master/geojson/Islands.geojson",
	data: [],
	color: "#FFFFFF",
	opacity: 0.6,
	type: "fill",	

	loadData: function(){
		var layerData = this.data;
		$.ajax({
			type: "GET",
			url: IslandModel.url,
			async: false,
			dataType: "json",
			success: function(result){
				result = LayerModel.formatYear(result,IslandModel.id);
				var layerTemplate = {
					'id': IslandModel.id,
					'type': IslandModel.type,
					'source': {
						'type': 'geojson',
						'data': result, 
					}
				};
				
				// Creating styles for the layers
				layerTemplate['paint'] = {
					'fill-color': IslandModel.color,
					'fill-opacity': IslandModel.opacity
				};
				layerData.push(layerTemplate);
			}
		});
		this.data = layerData;
		return layerData;
	},
}