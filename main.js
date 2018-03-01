$(document).ready(function(){
	console.log("hello console");
	var mapData = LayerModel.loadData();
	console.log(mapData);
	MapboxController.loadMap(mapData);
});