var mapData = LayerModel.loadData();
$(document).ready(function(){
	// Project require webgl support
	if(webgl_support() == null){
		$('.notice').css('display','block');
		$('#menu').css('display','none');
	}
	var viewportHeight = $(window).height() - parseFloat($("#main-footer").css('height')) - parseFloat($("#main-header").css('height')) - parseFloat($("#wpadminbar").css('height'));
	$(".map-container").css('height',viewportHeight);
	// console.log(mapData);
	MapboxController.loadMap(mapData);
});
var webgl_support = function () { 
  	try{
    var canvas = document.createElement( 'canvas' ); 
    return !! window.WebGLRenderingContext && ( 
         canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) );
   	}catch( e ) { return null; } 
};