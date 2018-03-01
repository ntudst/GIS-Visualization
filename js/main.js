$(document).ready(function(){
	var mapData = LayerModel.loadData();
	MapboxController.loadMap(mapData);
});