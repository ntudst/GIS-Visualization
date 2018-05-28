var LegendController = {
	legendData: {
		legend1: {
			name: "Kangxi",
			color: "#8A2BE2",
		},
		legend2: {
			name: "Qianlong",
			color: "#FF8C00",
		},
		legend3: {
			name: "Others",
			color: "#707070",
		},
	},
	buildLegendDisplay: function(){
		$.each(LegendController.legendData, function(key, value){
			var content = $("<p>"+value.name+"</p>");
			$("#legend").append(content);
		});
	},
};