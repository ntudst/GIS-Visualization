var RockerieModel = {
	id: "rockeries",
	label: "Rockeries",
	url: "https://raw.githubusercontent.com/michaelhoanglong/GIS-Visualization/master/geojson/rockeries.geojson",
	data: [],
	opacity: 0.6,
	type: "symbol",
	icon: "mountain-15",	

	loadData: function(){
		var layerData = this.data;
		$.ajax({
			type: "GET",
			url: RockerieModel.url,
			async: false,
			dataType: "json",
			success: function(result){
				result = ModelManager.formatYear(result,RockerieModel.id);
				var layerTemplate = {
					'id': RockerieModel.id,
					'type': RockerieModel.type,
					'source': {
						'type': 'geojson',
						'data': result, 
					}
				};
				
				// Creating styles for the layers
				layerTemplate['layout'] = {
					"icon-image": RockerieModel.icon,
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