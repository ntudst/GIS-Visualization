var ScenicareaModel = {
	id: "scenicareas",
	label: "Scenic Areas",
	url: "https://cdn.jsdelivr.net/gh/ntudst/GIS-Visualization@1.3/geojson/scenic-area.geojson",
	data: [],
	opacity: 0.6,
	type: "symbol",
	icon: "monument-15",	

	loadData: function(){
		var layerData = this.data;
		$.ajax({
			type: "GET",
			url: ScenicareaModel.url,
			async: false,
			dataType: "json",
			success: function(result){
				result = ModelManager.formatYear(result,ScenicareaModel.id);
				var layerTemplate = {
					'id': ScenicareaModel.id,
					'type': ScenicareaModel.type,
					'source': {
						'type': 'geojson',
						'data': result, 
					}
				};
				
				// Creating styles for the layers
				layerTemplate['layout'] = {
					"icon-image": ScenicareaModel.icon,
					"icon-size": 1,
		            "text-field": "{Name}",
		            "text-font": ["Open Sans Regular", "Arial Unicode MS Regular"],
		            "text-offset": [0, 0.6],
		            "text-anchor": "top",
		            "text-size": 12,
				};
				layerData.push(layerTemplate);
			}
		});
		this.data = layerData;
		return layerData;
	},
}