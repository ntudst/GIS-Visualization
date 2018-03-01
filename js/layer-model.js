var LayerModel = {
	layerData: {
		waterfeature: {
			url: null,
			data: null,
			color: null,
			opacity: null		
		},
		walls: {
			url: null,
			data: null,
			color: null,
			opacity: null		
		},
		streams: {
			url: null,
			data: null,
			color: null,
			opacity: null		
		},
		scenicarea: {
			url: null,
			data: null,
			color: null,
			opacity: null		
		},
		rockeries: {
			url: null,
			data: null,
			color: null,
			opacity: null		
		},
		perimeterwalls: {
			url: null,
			data: null,
			color: null,
			opacity: null		
		},	
		lakes: {
			url: "https://raw.githubusercontent.com/michaelhoanglong/GIS-Visualization/master/geojson/lakes.geojson",
			data: null,
			color: "#088",
			opacity: 0.8		
		},
		islands: {
			url: "https://raw.githubusercontent.com/michaelhoanglong/GIS-Visualization/master/geojson/Islands.geojson",
			data: null,
			color: "#8B008B",
			opacity: 0.8		
		},
		buildings: {
			url: "https://raw.githubusercontent.com/michaelhoanglong/GIS-Visualization/master/geojson/building.geojson",
			data: null,
			color: "#FFFF00",
			opacity: 0.8		
		},
	},
	loadData: function(){
		var layerData = this.layerData;
		for(var layerName in layerData){
			if(layerData[layerName] != null){
				if(layerData[layerName]["url"] != null && layerData[layerName]["data"] == null){
					$.ajax({
						type: "GET",
						url: layerData[layerName]["url"],
						async: false,
						dataType: "json",
						success: function(result){
							layerData[layerName]["data"] = {
								'id': layerName,
								'type': 'fill',
								'source': {
									'type': 'geojson',
									'data': result, 
									},
								'layout': {},
								'paint': {
									'fill-color': layerData[layerName]["color"],
									'fill-opacity': layerData[layerName]["opacity"]
								}
							};
						}
					});
				}
			}
		}
		this.layerData = layerData;
		return layerData;
	}
};


