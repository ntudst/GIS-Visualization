var WaterfeatureModel = {
	id: "waterfeatures",
	label: "Water Features",
	url: "https://raw.githubusercontent.com/michaelhoanglong/GIS-Visualization/master/geojson/water-features.geojson",
	data: [],
	opacity: 0.6,
	type: "symbol",
	icon: "park-15",	

	loadData: function(){
		var layerData = this.data;
		$.ajax({
			type: "GET",
			url: WaterfeatureModel.url,
			async: false,
			dataType: "json",
			success: function(result){
				result = LayerModel.formatYear(result,WaterfeatureModel.id);
				var layerTemplate = {
					'id': WaterfeatureModel.id,
					'type': WaterfeatureModel.type,
					'source': {
						'type': 'geojson',
						'data': result, 
					}
				};
				
				// Creating styles for the layers
				layerTemplate['layout'] = {
					"icon-image": WaterfeatureModel.icon,
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