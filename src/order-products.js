(function(){
	var gl = window.gl;
    gl.block(function() {
        setTimeout(function() {
            $.unblockUI();
        },1000);
    });
    gl.initPop();
})();




