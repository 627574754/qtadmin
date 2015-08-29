(function(){
	var gl = window.gl;

	//tab切换
	function tabSwitch() {
		var tabs = $('.navTab');
		var cnts = $('.tabCnt');
		tabs.on('click',function() {
			var index = $(this).index();
			tabs.removeClass('active');
			cnts.addClass('none').eq(index).removeClass('none');
			$(this).addClass('active');
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
			var tmp = '<div class="aths-item-wrap" id="'+id+'"><div class="lt-l f30 '+icon+'"></div><div class="aths-item"><a href="#" class="fblue">'+name+'</a><p>'+time+'</p></div><div class="lt-r"><i class="aths-icon-edit icon-pencil"></i><i class="aths-icon-del icon-cancel"></i></div></div>';
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
	//transaction 列表加载
	function loadTstTable() {
		var tbody = $('#tstWrap tbody');
		var moreBtn = $('#tstWrap .moreData');
		var curNum = moreBtn.find('.curNum');
		var totolNum = moreBtn.find('.totolNum');
		var tn = tbody.find('tr').length;
		var cn = 10;
		//初始化展示表格，默认展示10条
		console.log(tn,curNum,totolNum)
		tbody.find('tr:gt(10)').addClass('none');
		curNum.text(cn);
		totolNum.text(tn);
		moreBtn.on('click', function() {
			
			//每点击一下展开10条数据
			if(cn + 10 >= tn) {
				//没有下一页了
				moreBtn.addClass('none');
				tbody.find('tr').removeClass('none');
			}
			else {
				cn += 10;
				curNum.text(cn);
				tbody.find('tr:lt('+cn+')').removeClass('none');
			}

		});
	}
	

	//初始化tab切换
	tabSwitch();
	//attachments 上传文件
	fileUpload();
	//transaction 列表加载
	loadTstTable();

    var dialog = new gl.Dialog({
        title: '系统提示', //窗口标题的html，如果不设置则无标题
        content: '<div class="ui-dialog-bd"><p>欢迎！</p></div>',
        //窗口内容的html，必须是html格式不能是无格式纯文本，如果不设置则无内容
        beforeClose: null, //调用close方法时执行的callback，如果此callback返回false则会阻止窗口的关闭
        showClose: false,
        showFooter: true,
        className: '', //窗口最外层容器的类名
        cache: true, //是否缓存。若为false则close()的时候会remove掉对话框对应的dom元素
        width: '40%' //窗口宽度，如不传递默认为40%
    });
    dialog.open();
})();