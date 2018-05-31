var PerimeterwallModel = {
	id: "perimeterwalls",
	label: "Perimeter Walls",
	url: "https://cdn.jsdelivr.net/gh/ntudst/GIS-Visualization@1.2/geojson/perimeter-wall.geojson",
	data: [],
	color: "#fed976",
	linewidth: 3,
	type: "line",

	loadData: function(){
		var layerData = this.data;
		$.ajax({
			type: "GET",
			url: PerimeterwallModel.url,
			async: false,
			dataType: "json",
			success: function(result){
				result = ModelManager.formatYear(result,PerimeterwallModel.id);
				var layerTemplate = {
					'id': PerimeterwallModel.id,
					'type': PerimeterwallModel.type,
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
					'line-color': PerimeterwallModel.color,
					'line-width': PerimeterwallModel.linewidth
				};
				layerData.push(layerTemplate);
			}
		});
		this.data = layerData;
		return layerData;
	},
}