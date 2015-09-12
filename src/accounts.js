(function(){
	var gl = window.gl;

	var iptDlgs = {};

	//初始化页面
	function initHandle() {
		//初始化下拉框
		gl.initSelect();

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
		});
		//返回列表页
		var jumpBtn = $('.jumpBtn');
		jumpBtn.on('click', function() {
			var i = $(this).data('pg');
			var curPage = pages.eq(i);  //返回页面
			setTimeout(function(){
				pages.not(curPage).css('left','200%');
				curPage.removeClass('moving');
			},300);
			curPage.addClass('moving');
			curPage.animate({left: '0px'}, 300);
		});
	}
	//初始化输入框组
	function initIptGroup() {
		var iptGroups = $('.iptGroup');
		iptGroups.on('click', function(){
			var name = $(this).data('name');
			iptDlgs[name].open();
		});
		for (var i = iptGroups.length - 1; i >= 0; i--) {
			var el = $(iptGroups[i]);
			var name = el.data('name');
			var dlg = $('#' + name + 'Dlg');
			var title = el.data('title');
			var tmp = dlg.html();
			iptDlgs[name] = new gl.Dialog({
				title: title, 
				content: tmp,
				width: '40%' //窗口宽度，如不传递默认为40%
			});
			var cnt = $('.ui-dialog-pop .'+name +'Content');
			$('.items', cnt).on('click', function(){
				var n = $(this).parents('.dl-content').data('name');
				var ipt = $('input[name="'+n+'"]');
				var val = $(this).data('value');
				iptDlgs[n].close();
				ipt.val(val);
			});
		};
	}
	
	
	//初始化页面
	initHandle();
	//页面切换
	pageSwitch();
	//初始化input框
	initIptGroup();
})();




