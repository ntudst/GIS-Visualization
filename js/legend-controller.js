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
			name: "Uncertain",
			color: "#707070",
		},
	},
	buildLegendDisplay: function(){
		$.each(LegendController.legendData, function(key, value){
			//Build a Bootstrap row for each legend
			//
			var content = $("<div class='row center-content legend-content'><div id='legend-color' class='col-6 col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'><div class='legend-icon' style='background: "+value.color+";'></div></div><div class='legend-text col-6 col-xs-6 col-sm-6 col-md-6 col-lg-6 col-xl-6'><p>"+value.name+"</p></div></div>");
			console.log(content);
			$("#legend").append(content);
		});
		var contentWidth = parseFloat($(".legend-content").css("width"));
		$(".legend-content").each(function(){
			var width = parseFloat($(this).css("width"));
			console.log(width);
			if(width > contentWidth){
				contentWidth = width;
			}
		});
		$("#legend").css("width",contentWidth+10);
		console.log($("#legend").css("width"));
	},

	resizeLegendDisplay: function(){
		$("#map-legend").on("change", function(){
			$("#legend").empty();
			LegendController.buildLegendDisplay();
		});
	},
};