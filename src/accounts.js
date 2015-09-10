(function(){
	var gl = window.gl;

	//初始化页面
	function initHandle() {
		//底部初始化
		var handle = $('#btmHandle');
		var group = $('#btmGroup');
		var btn = $('#dataBtn');
		//列表分类搜索操作
		gl.initBottom(handle);
		gl.initBottom(group);
		gl.initBottom(btn);
	}
	//页面切换
	function pageSwitch() {
		var pages = $('.cntPage');
		//添加页面切换
		$('#list').on('click', '.item-wrap', function() {
			var i = 1;  //详情页
			var curPage = pages.eq(i);
			setTimeout(function(){
				pages.not(curPage).css('left','200%');
				curPage.removeClass('moving');
			},300);
			curPage.addClass('moving');
			curPage.animate({left: '0px'}, 300);
		})
		//返回列表页
		var backBtn = $('#backList');
		backBtn.on('click', function() {
			var curPage = pages.eq(0);  //列表页
			setTimeout(function(){
				pages.not(curPage).css('left','200%');
				curPage.removeClass('moving');
			},300);
			curPage.addClass('moving');
			curPage.animate({left: '0px'}, 300);
		});
	}
	
	//初始化页面
	initHandle();
	//页面切换
	pageSwitch();
})();




