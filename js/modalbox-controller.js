var ModalBoxController = {
	onBuildingSelected: function(layerIDlist, map){
		map.on('click', function (e) {
    		var features = map.queryRenderedFeatures(e.point);
    		if($("#building-detail-inner").children().length != 0){
    			$("#building-detail").css("display","none");
    		}
    		features.forEach(function(feature){
    			if(layerIDlist.indexOf(feature.layer.id) != -1){
    				ModalBoxController.buildBuildingDetail(feature);
    				ModalBoxController.displayBuildingDetail(e.point.x,e.point.y);
    			}
    		});
    	});
	},
	displayBuildingDetail: function(x, y){
		var maxWidth = $(window).width() - parseFloat($("#map-layer").css('width'));
		var maxHeight = $(window).height() - parseFloat($("#main-footer").css('height')) - parseFloat($("#main-header").css('height')) - parseFloat($("#wpadminbar").css('height'));
		var containerHeight = $("#building-detail").css("height");
		var containerWidth = $("#building-detail").css("width");
		var x_pos = parseFloat(x) + 20;
		var y_pos = y;
		if(parseFloat(x) + parseFloat(containerWidth) >= maxWidth){
			x_pos = parseFloat(x) - parseFloat(containerWidth) - 20;
		}
		if(parseFloat(y) + parseFloat(containerHeight) >= maxHeight){
			y_pos = parseFloat(y) - ((parseFloat(y) + parseFloat(containerHeight)) - maxHeight) - 20;
		}
		$("#building-detail").css({'top': y_pos, 'left':x_pos}).fadeIn('slow');
	},
	buildBuildingDetail: function(feature){
		var buildingDetail = {
			name : $("<div class='center-header detail-header'><h3>"+feature.properties.Struct_Nam+"</h3></div>"),
			typologyGroup : $("<div class='bold-header'>"+"Topology Group"+"</div>"+"<p>"+feature.properties.Typology+"</p>"),
			structureType : $("<div class='bold-header'>"+"Structure Type"+"</div>"+"<p>"+feature.properties.Sub_type+"</p>"),
			reign : $("<div class='bold-header'>"+"Reign"+"</div>"+"<p>"+feature.properties.Constr_Reign+"</p>"),
			constructionDate : $("<div class='bold-header'>"+"Construction Date"+"</div>"+"<p>"+feature.properties.Alt_Constr+"</p>"),
			destructionDate : $("<div class='bold-header'>"+"Destruction Date"+"</div>"+"<p>"+feature.properties.Date_destr+"</p>"),
			restorationDate : $("<div class='bold-header'>"+"Restoration Date"+"</div>"+"<p>"+feature.properties.Date_rest_+"</p>")
		};
		$("#building-detail-inner").empty();
		$.each(buildingDetail, function(key, value){
			$("#building-detail-inner").append(value);
		});
	},
};