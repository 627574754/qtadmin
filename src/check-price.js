(function(){
	var gl = window.gl;

    var duplicateDialog;
    var addDlg;

    function loadCustomer(){

    }

	//初始化页面
	function initHandle() {
		//底部初始化
		var handle = $('#btmHandle');
		//列表分类搜索操作
		gl.initBottom(handle);
		//选择客户
		var customerDlgHtml = $('#customerListDialog').html();
		addDlg = new gl.Dialog({
			title: '检查价格和可用性', //窗口标题的html，如果不设置则无标题
			content: customerDlgHtml,
			//窗口内容的html，必须是html格式不能是无格式纯文本，如果不设置则无内容
			beforeClose: null, //调用close方法时执行的callback，如果此callback返回false则会阻止窗口的关闭
			showClose: false,
			showFooter: false,
			className: '', //窗口最外层容器的类名
			cache: true, //是否缓存。若为false则close()的时候会remove掉对话框对应的dom元素
			width: '30%' //窗口宽度，如不传递默认为40%
		});

        addDlg.$root.on('click', '.list-item', function(e){
            addDlg.$root.find('.list-item').removeClass('selected');
            $(this).addClass('selected');
        });

        addDlg.$root.find('.j_ok').on('click', function(){
            addDlg.close();
        });

	}

    function bindEvents(){
        var submitDlg;
        $('.j_expense_op .j_submit').on('click', function(){
            if(!submitDlg){
                submitDlg = new gl.Dialog({
                    title: 'Expense Expense', //窗口标题的html，如果不设置则无标题
                    content: $('#submitDlg').html(),
                    //窗口内容的html，必须是html格式不能是无格式纯文本，如果不设置则无内容
                    beforeClose: null, //调用close方法时执行的callback，如果此callback返回false则会阻止窗口的关闭
                    showClose: false,
                    showFooter: false,
                    className: '', //窗口最外层容器的类名
                    cache: true, //是否缓存。若为false则close()的时候会remove掉对话框对应的dom元素
                    width: '40%' //窗口宽度，如不传递默认为40%
                });
                console.log(submitDlg.$root)
                submitDlg.$root.find('.j_rule').click(function(e){
                    e.preventDefault();
                    var checkbox = submitDlg.$root.find('.ui-checkbox');
                    var checked = checkbox.hasClass('checked');
                    checkbox[checked ? 'removeClass' : 'addClass']('checked');
                    var ok = submitDlg.$root.find('.j_ok');
                    ok[checked ? 'addClass' : 'removeClass']('disabled ');
                });
            }
            submitDlg.open();
        });

        $('.j_expense_op .j_cancel').on('click', function(){
            gl.Dialog.confirm('Do you really want to discard all unsaved changes?', '取消', function(){
                alert('点击确定');
            }, function(){
                alert('点击取消');
            });
        });


        $('.j_expense_op .j_duplicate').on('click', function(){
            if(!duplicateDialog){
                duplicateDialog = new gl.Dialog({
                    title: 'Duplicate', //窗口标题的html，如果不设置则无标题
                    content: $('#duplicateDlg').html(),
                    //窗口内容的html，必须是html格式不能是无格式纯文本，如果不设置则无内容
                    beforeClose: null, //调用close方法时执行的callback，如果此callback返回false则会阻止窗口的关闭
                    showClose: false,
                    showFooter: false,
                    className: '', //窗口最外层容器的类名
                    cache: true, //是否缓存。若为false则close()的时候会remove掉对话框对应的dom元素
                    width: '400px' //窗口宽度，如不传递默认为40%
                });
            }
        });

        $('.j_expense_op .j_remove').on('click', function(){
            gl.Dialog.confirm('Your expense report will be deleted. Do you want to continue?', '移除', function(){
                alert('点击确定');
            }, function(){
                alert('点击取消');
            });
        });
    }

	//初始化页面
	initHandle();

    bindEvents();

    gl.block(function() {
        setTimeout(function() {
            $.unblockUI();
            addDlg.open();
        },1000);
    });
    gl.initPop();

    //gl.Dialog.error('人员编号123由用户USER12锁定', function(){alert(1)});

    //gl.Dialog.wraning('adsfasf','warning', function(){alert(1)}, function(){alert(2)})

})();




