$(document).ready(function(){
	// Project require webgl support
	if(webgl_support() == null){
		$('.notice').css('display','block');
		$('#menu').css('display','none');
	}
	var mapData = LayerModel.loadData();
	MapboxController.loadMap(mapData);
});
var webgl_support = function () { 
  	try{
    var canvas = document.createElement( 'canvas' ); 
    return !! window.WebGLRenderingContext && ( 
         canvas.getContext( 'webgl' ) || canvas.getContext( 'experimental-webgl' ) );
   	}catch( e ) { return null; } 
};