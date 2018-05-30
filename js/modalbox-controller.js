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
		var maxWidth = parseFloat($(window).width());
		var minWidth = 0;
		// when on mobile, the maxWidth and minWidth are re-defined
		if(parseFloat($(window).width()) > 768){
			maxWidth = parseFloat($(window).width()) - parseFloat($("#map-layer").css('width'));
			minWidth = parseFloat($("#map-filter").css('width'));
		}
		var maxHeight = parseFloat($(window).height()) - parseFloat($("#main-footer").css('height')) - parseFloat($("#main-header").css('height')) - parseFloat($("#wpadminbar").css('height'));
		var containerHeight = $("#building-detail").css("height");
		var containerWidth = $("#building-detail").css("width");
		var x_pos = parseFloat(x);
		var y_pos = parseFloat(y);
		if(parseFloat(x) + parseFloat(containerWidth) >= maxWidth){
			x_pos = parseFloat(x) - parseFloat(containerWidth) - 20;
		}
		if(x_pos - parseFloat(containerWidth) < minWidth){
			x_pos = minWidth;
		}
		console.log('x ' + parseFloat(x));
		console.log('x_pos ' + x_pos);
		console.log('minwidth ' + minWidth);
		if(parseFloat(y) + parseFloat(containerHeight) >= maxHeight){
			y_pos = parseFloat(y) - ((parseFloat(y) + parseFloat(containerHeight)) - maxHeight) - 20;
		}
		$("#building-detail").css({'top': y_pos, 'left':x_pos}).fadeIn('slow');
	},
	buildBuildingDetail: function(feature){
		var buildingDetail = {
			name : $("<div class='center-header detail-header'><h3>"+feature.properties.struct_name+"</h3></div>"),
			typologyGroup : $("<div class='bold-header'>"+"Topology Group"+"</div>"+"<p>"+feature.properties.typology+"</p>"),
			structureType : $("<div class='bold-header'>"+"Structure Type"+"</div>"+"<p>"+feature.properties.typology_sub_type+"</p>"),
			reign : $("<div class='bold-header'>"+"Reign"+"</div>"+"<p>"+feature.properties.constr_reign+"</p>"),
			constructionDate : $("<div class='bold-header'>"+"Construction Date"+"</div>"+"<p>"+feature.properties.constr_date+"</p>"),
			destructionDate : $("<div class='bold-header'>"+"Destruction Date"+"</div>"+"<p>"+feature.properties.destr_date+"</p>"),
			restorationDate : $("<div class='bold-header'>"+"Restoration Date"+"</div>"+"<p>"+feature.properties.alter_date+"</p>"),
			viewDetail: $("<div class='center-content'><a class='btn btn-primary' href='"+feature.properties.object_url+"' target='_blank'>"+"View More"+"</a></div>"),
		};
		$("#building-detail-inner").empty();
		$.each(buildingDetail, function(key, value){
			$("#building-detail-inner").append(value);
		});
		var mapHeight = parseFloat($("#map").css("height"));
		var modalBoxHeight = parseFloat($("#building-detail-inner").css("height"));
		if(modalBoxHeight > mapHeight - 13){
			modalBoxHeight = mapHeight - 100;
		}
		$("#building-detail-inner").css("overflow-y", "auto");
		$("#building-detail-inner").css("max-height", mapHeight - 100);
	},
};