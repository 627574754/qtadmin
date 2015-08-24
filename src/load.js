(function(){
	var gl = window.gl;

	gl.block(function() {
		setTimeout(function() {
			$.unblockUI();
		},2000);
	});
	gl.initPop();
	
})();