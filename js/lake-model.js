var LakeModel = {
	id: "lakes",
	label: "Lakes",
	url: "https://raw.githubusercontent.com/michaelhoanglong/GIS-Visualization/master/geojson/lakes.geojson",
	data: [],
	color: "#92C5D8",
	opacity: 0.6,
	type: "fill",	

	loadData: function(){
		layerData = this.data;
		$.ajax({
			type: "GET",
			url: LakeModel.url,
			async: false,
			dataType: "json",
			success: function(result){
				result = ModelManager.formatYear(result,LakeModel.id);
				var layerTemplate = {
					'id': LakeModel.id,
					'type': LakeModel.type,
					'source': {
						'type': 'geojson',
						'data': result, 
					}
				};
				
				// Creating styles for the layers
				layerTemplate['paint'] = {
					'fill-color': LakeModel.color,
					'fill-opacity': LakeModel.opacity
				};
				layerData.push(layerTemplate);
			}
		});
		this.data = layerData;
		return layerData;
	},
}