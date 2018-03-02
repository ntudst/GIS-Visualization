var LayerModel = {
	layerData: {
		waterfeature: {
			url: "https://raw.githubusercontent.com/michaelhoanglong/GIS-Visualization/master/geojson/water-features.geojson",
			data: null,
			color: "#bd0026",
			opacity: 0.8,
			type: "symbol"		
		},
		walls: {
			url: "https://raw.githubusercontent.com/michaelhoanglong/GIS-Visualization/master/geojson/walls.geojson",
			data: null,
			color: "#f03b20",
			linewidth: 5,
			type: "line"		
		},
		streams: {
			url: "https://raw.githubusercontent.com/michaelhoanglong/GIS-Visualization/master/geojson/streams.geojson",
			data: null,
			color: "#fd8d3c",
			linewidth: 5,
			type: "line"		
		},
		scenicarea: {
			url: "https://raw.githubusercontent.com/michaelhoanglong/GIS-Visualization/master/geojson/scenic-area.geojson",
			data: null,
			color: "#feb24c",
			opacity: 0.8,
			type: "symbol"		
		},
		rockeries: {
			url: "https://raw.githubusercontent.com/michaelhoanglong/GIS-Visualization/master/geojson/rockeries.geojson",
			data: null,
			color: "#253494",
			opacity: 0.8,
			type: "symbol"		
		},
		perimeterwalls: {
			url: "https://raw.githubusercontent.com/michaelhoanglong/GIS-Visualization/master/geojson/perimeter-wall.geojson",
			data: null,
			color: "#fed976",
			linewidth: 5,
			type: "line"		
		},	
		lakes: {
			url: "https://raw.githubusercontent.com/michaelhoanglong/GIS-Visualization/master/geojson/lakes.geojson",
			data: null,
			color: "#088",
			opacity: 0.8,
			type: "fill"		
		},
		islands: {
			url: "https://raw.githubusercontent.com/michaelhoanglong/GIS-Visualization/master/geojson/Islands.geojson",
			data: null,
			color: "#8B008B",
			opacity: 0.8,
			type: "fill"		
		},
		buildings: {
			url: "https://raw.githubusercontent.com/michaelhoanglong/GIS-Visualization/master/geojson/building.geojson",
			data: null,
			color: "#FFFF00",
			opacity: 0.8,
			type: "fill"		
		},
	},
	loadData: function(){
		var layerData = this.layerData;
		for(var layerName in layerData){
			if(layerData[layerName] != null){
				if(layerData[layerName]["url"] != null && layerData[layerName]["data"] == null){
					var layerTemplate = {
								'id': layerName,
								'type': layerData[layerName]["type"],
								'source': {
									'type': 'geojson',
									'data': result, 
								}
							};
					if(layerData[layerName]["type"] == "fill"){
						layerTemplate['paint'] = {
							'fill-color': layerData[layerName]["color"],
							'fill-opacity': layerData[layerName]["opacity"]
						};
						if(layerName == "buildings"){
							layerTemplate['layout'] = {
								"text-field": "{Name}",
					            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
					            "text-offset": [0, 0.6],
					            "text-anchor": "top"
							};
						}
					}
					else if(layerData[layerName]["type"] == "line"){
						layerTemplate['layout'] = {
							'line-join': 'round',
							'line-cap': 'round'
						};
						layerTemplate['paint'] = {
							'line-color': layerData[layerName]["color"],
							'line-width': layerData[layerName]["linewidth"]
						};
					}
					else{
						layerTemplate['layout'] = {
							"icon-image": "circle-15",
				            "text-field": "{Name}",
				            "text-font": ["Open Sans Semibold", "Arial Unicode MS Bold"],
				            "text-offset": [0, 0.6],
				            "text-anchor": "top"
						};
					}
					$.ajax({
						type: "GET",
						url: layerData[layerName]["url"],
						async: false,
						dataType: "json",
						success: function(result){
							layerData[layerName]["data"] = layerTemplate;
						}
					});
				}
			}
		}
		this.layerData = layerData;
		return layerData;
	}
};


