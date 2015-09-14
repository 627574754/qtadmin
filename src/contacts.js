(function(){
	var gl = window.gl;

	//tab切换
	function tabSwitch() {
		var tabs = $('.navTab');
		var cnts = $('.tabCnt');
		tabs.on('click',function() {
			var index = $(this).index();
			tabs.removeClass('cur');
			cnts.addClass('none').eq(index).removeClass('none');
			$(this).addClass('cur');
		});
	}
	//上传文件
	function fileUpload() {
		var fileName;
		var options = {
			url: 'url',  //上传文件地址
			dataType: null,
			type: "post",
			success: function(repose) {
				//成功回调
				var time = new Date();
				$('#tmpData').remove();
				addData(fileName,'icon-doc-text',time);
			},
			error: function() {
				//debug 因为没有上传接口，会发生错误，会执行此处代码
				setTimeout(function() {
					var time = new Date();
					$('#tmpData').remove();
					addData(fileName,'icon-doc-text',time);
				},2000);
			}
		};
		$('#uploadBtn').delegate('#fileUploadBtn', "change", function() {
			var fileValue = $(this).val();
			var index = fileValue.lastIndexOf("\\");
			fileName = fileValue.substring(index + 1);
			$("#uploadBtn").ajaxSubmit(options);
			//添加一条数据
			addData(fileName);
			return false;
		});
		//添加数据
		function addData (name,icon,time) {
			var id = icon ? '' : 'tmpData';
			var icon = icon || 'animate-spin icon-spin3 fblue';
			var time = time || 'Uploading';
			var container = $('#attchWrap .list-title');
			var tmp = '<div class="aths-item-wrap" id="'+id+'"><div class="lt-l f30 '+icon+'"></div><div class="aths-item"><a href="#" class="fblue">'+name+'</a><p>'+time+'</p></div><div class="lt-r"><i class="aths-icon-edit icon-pencil attchEdit"></i><i class="aths-icon-del icon-cancel attchDel"></i></div></div>';
			$(tmp).insertAfter(container);
		}
	}
	//attachments 编辑
	$('#attchWrap').on('click','.attchEdit',function(){
		var me = $(this);
		var item = $(this).parents('.aths-item-wrap');
		var ipt = item.find('input');
		var txt = ipt.prev();
		if(me.hasClass('icon-cog-outline')) {
			//保存
			txt.find('a').html(ipt.val());
		}
		ipt.toggleClass('none');
		txt.toggleClass('none');
		$(this).toggleClass('icon-cog-outline');
	});
	//attachments 删除
	$('#attchWrap').on('click','.attchDel',function(){
		var me = $(this);
		var item = $(this).parents('.aths-item-wrap');
		new gl.Dialog.confirm('确定删除选中数据?','删除提示',function(){
			item.remove();
		});
	});
	//note回复列表加载
	function loadNoteReturn() {
		var list = $('#noteWrap .noteList');
		var moreBtn = $('#noteWrap .moreData');
		var curNum = moreBtn.find('.curNum');
		var totolNum = moreBtn.find('.totolNum');
		var tn = list.find('.nItem').length;
		var cn = 4;
		var steep = 4;
		//初始化展示表格，默认展示4条
		list.find('.nItem:gt('+cn+')').addClass('none');
		curNum.text(cn);
		totolNum.text(tn);
		moreBtn.on('click', function() {
			
			//每点击一下展开4条数据
			if(cn + steep >= tn) {
				//没有下一页了
				moreBtn.addClass('none');
				list.find('.nItem').removeClass('none');
			}
			else {
				cn += steep;
				curNum.text(cn);
				list.find('.nItem:lt('+cn+')').removeClass('none');
			}

		});
	}
	function initTimeSelect() {
		var birthEl = $('input[name="birthTime"]');
		// 绑定时间选择器
		birthEl.datepicker({
			timeFormat: 'yy-mm-dd'
		});
	}
	//页面切换
	function pageSwitch() {
		var pages = $('.cntPage');
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
			curPage.animate({left: '320px'}, 300);
		});
		//编辑取消
		var btnCancel = $('.btnCancel');
		btnCancel.on('click', function() {
			var btn = $(this);
			new gl.Dialog.confirm('放弃编辑?','提示',function(){
				var i = btn.data('pg');;  
				console.log(i)
				var curPage = pages.eq(i);  //返回的页面
				console.log(curPage)
				setTimeout(function(){
					pages.not(curPage).css('left','200%');
					curPage.removeClass('moving');
				},300);
				curPage.addClass('moving');
				curPage.animate({left: '320px'}, 300);
			});
		});
	}
	//初始化页面
	function initHandle() {
		//初始化下拉框
		gl.initSelect();
		//底部初始化
		var handle = $('#btmHandle');
		var filter = $('#btmFilter');
		//列表分类搜索操作
		gl.initBottom(handle);
		//筛选 全部/打开
		gl.initBottom(filter);
	}
	
	gl.block(function() {
		setTimeout(function() {
			$.unblockUI();
		},1000);
	});
	gl.initPop();
	
	//初始化tab切换
	tabSwitch();
	//attachments 上传文件
	fileUpload();
	//加载note回复列表
	loadNoteReturn();
	//初始化页面
	initHandle();
	pageSwitch();
	initTimeSelect();

})();




