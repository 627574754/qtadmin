window.gl = {};
$.extend(gl, function(){

	function initPager(forceInit, el, opt, callback){
		if (typeof forceInit != 'boolean') {
			callback = opt;
			opt = el;
			el = forceInit;
			forceInit = false;
		}

		el = $(el);
		opt = $.extend({
			pn: 0,
			rn: 10,
			npn: 10,
			spn: 0,
			tpn: 0
		}, opt);

		opt.spn = Math.max(0, opt.pn-(opt.npn/2|0));

		function getPagerHtml(pn, tpn, spn, npn) {
			if (tpn <= 1) {
				return '';
			}

			var html = '<ul>';
			html += (pn == 0 ? '<li class="disabled">' : '<li>') + '<a href="#" class="prev" data-pn="{0}">上一页</a></li>'.format(pn-1);
			if (pn-(npn/2|0) > 0) {
				html += '<li><a href="#" class="first" data-pn="0">1...</a></li>';
			}
			var n = Math.min(tpn,spn+npn);
			for (var i = Math.max(Math.min(spn, n-npn), 0) ; i < n; i++) {
				html += (pn == i ? '<li class="active">' : '<li>') + '<a href="#" class="page" data-pn="{0}">{1}</a></li>'.format(i, i+1);
			}
			if (pn+(npn/2|0) < tpn) {
				html += '<li><a href="#" class="last" data-pn="{0}">...{1}</a></li>'.format(tpn-1, tpn);
			}
			html += (pn == tpn-1 ? '<li class="disabled">' : '<li>') + '<a href="#" class="next" data-pn="{0}">下一页</a></li>'.format(pn+1);
			html += '</ul>';

			return html;
		}

		el.off('click.pager').on('click.pager', 'a', function(e){
			e.preventDefault();

			var me = $(this);

			if (me.parent().hasClass('disabled')) {
				return;
			}

			var pn = me.data('pn');
			var tpn = opt.tpn;
			var npn = opt.npn;
			var spn = Math.max(0, pn-(npn/2|0));

			!forceInit && el.html(getPagerHtml(pn, tpn, spn, npn));

			callback && callback(pn);
		});

		el.html(getPagerHtml(opt.pn, opt.tpn, opt.spn, opt.npn));
	}

	function initPop(){
		var popBtn = $('.pop-btn');
		popBtn.each(function(index, item) {
			var popEl = $(item);
			var pop = $('.pop-wrap',popEl);

			popEl.on('click', function(){
				pop.toggleClass('none');

			});
			// 隐藏下拉框
			$('body').click(function(e){
				if (popEl[0] && !($.contains(popEl[0], e.target))) {
					pop.addClass('none');
				}
			});
		});
	}

	function initSelect(){
		var selEl = $('.selt-select');

		selEl.each(function(index, item){
			var selEl = $(item);
			var popBtn = $('.stan', selEl),
				spon = $('.sPon', selEl);

			var vkey = selEl.data('vkey') || 'value';
			stan.click(function(e){
				e.preventDefault();
				if($(this).hasClass('disabled')){
					return;
				}
				var me = $(this);
				me.closest('.selt').toggleClass('seltOn');
				me.siblings('.sPon').toggleClass('none');
			});
			spon.on('click', 'li', function(e){
				e.preventDefault();
				var me = $(this),
					a = me.find('a');

				var value = a.data(vkey);
				if (value !== selEl.data('value')) {
					stan.find('.stn').text(a.text());
					selEl.data('value', value).trigger('change');
				}

			});

			// 隐藏下拉框
			$('body').click(function(e){
				if ( stan[0] && !($.contains(stan[0], e.target) || stan[0] == e.target) ) {
					spon.addClass('none').closest('.selt').removeClass('seltOn');
				}
			});
		});
	}

	function initCheckBox(){
		$(document).on('click', '.ckbox', function(e){
			var me = $(this);
			console.log(me.hasClass('ckbox-cked'))
			if (me.hasClass('ckbox-cked')) {
				me.removeClass('ckbox-cked');
			} else {
				me.addClass('ckbox-cked');
			}
		});
	}

	function initQuery(){
		var query = location.href.queryUrl();
		for (var key in query) {
			var el = $('[name="'+key+'"]:not([type="hidden"])');
			if (el.length > 0) {
				el.is(':input') ? el.val(query[key]) : el.data('value', query[key]);
			}
		}
	}

	function block(handle){
		$.blockUI && $.blockUI({ 
			fadeIn: 1000, 
			fadeOut: 1000,
			message: '<div id="fiori2-loader"><div class="fiori2-blossom"><div class="fiori2-leafContainer fiori2-leafContainer1"><div class="fiori2-leaf fiori2-leaf1"></div></div><div class="fiori2-leafContainer fiori2-leafContainer2"><div class="fiori2-leaf fiori2-leaf2"></div></div><div class="fiori2-leafContainer fiori2-leafContainer3"><div class="fiori2-leaf fiori2-leaf3"></div></div><div class="fiori2-leafContainer fiori2-leafContainer4"><div class="fiori2-leaf fiori2-leaf4"></div></div><div class="fiori2-leafContainer fiori2-leafContainer5"><div class="fiori2-leaf fiori2-leaf5"></div></div></div></div>',
			overlayCSS: { 
				opacity: .2
			},
			css: { 
				'border': 'none',
				'left': '50%',
				'width': '200px',
				'margin-left': '-100px',
				'opacity': 1,
				'background': 'transparent'
			},
			onBlock: handle
		});
	}

	//底部初始化
	function initBottom(handle) {
		//显示操作列表
		var list;
		handle.on('click', function() {
			list = $(this).prev();
			list.fadeIn('fast');
		});
		$('body').click(function(e){
			if (list && handle[0] !== e.target && !($.contains(list[0], e.target))) {
				list.hide();
			}
		});
	}

	return {
		initPager: initPager,
		initSelect: initSelect,
		initPop: initPop,
		initCheckBox: initCheckBox,
		initQuery: initQuery,
		block: block,
		initBottom: initBottom
	};
}());


/*dialog*/
;(function(){
    /**
     * @Class Dialog
     * @Desc 对话框模块
     * 可以用j_dlg_close来标记关闭按钮
     * ui-dialog-bd代表容器主体，具有20px的margin
     * ui-dialog-ft代表btn的容器，具有20px的padding和灰色背景。这个容器里的所有.button类都有右边距15px
     *
     *
     * var dialog = new IOT.Dialog({
            title: '系统提示', //窗口标题的html，如果不设置则无标题
            content: '<div class="ui-dialog-bd"><p>欢迎！</p></div>',
            //窗口内容的html，必须是html格式不能是无格式纯文本，如果不设置则无内容
            beforeClose: null, //调用close方法时执行的callback，如果此callback返回false则会阻止窗口的关闭
            showClose: true,
            showFooter: true,
            className: '', //窗口最外层容器的类名
            cache: true, //是否缓存。若为false则close()的时候会remove掉对话框对应的dom元素
            width: '40%' //窗口宽度，如不传递默认为40%
        });
     * */
    function Dialog(options){
        this._options = $.extend(true, {
            title: '',
            content: '',
            beforeClose: null,
            showClose: true,
            showFooter: true,
            className: '',
            cache: true, //是否缓存。若为false则close的时候会remove掉对话框对应的dom元素
            width: '40%' //窗口宽度，默认为40%
        }, options);

        this._init();
    }

    $.extend(Dialog.prototype, {
        _init: function(){
            this._build();
            this._bindEvent();
        },
        /**
         * 创建对话框html
         * */
        _build: function(){
            var options = this._options;
            var style = 'width: ' + options.width;

            var html = '<div class="ui-dialog-pop ' + options.className + '" style="' + style + '">' +
                (options.title ? '<div class="ui-dialog-hd yahei">' + options.title + '</div>' : '');


            if(options.showClose){
                html += '<a class="ui-dialog-close j_dlg_close">&#215;</a>';
            }

            html += '</div>';

            this.$root = $(html).appendTo(document.body);

            this.$root.append($(options.content || ''));

            if(options.showFooter){
                this.$root.append($('<div class="ui-dialog-ft"><a class="button j_dlg_close">关闭</a></div>'));
            }

            this._$mask = $('<div class="ui-dialog-mask"></div>').appendTo($('body'));
        },

        _bindEvent: function(){
            var _this = this;
            var options = this._options;
            this.$root.on('click', '.j_dlg_close', function(e){
                e.preventDefault();
                //beforeClose执行结果为false,说明关闭时间被阻止了
                if(options.beforeClose && options.beforeClose.apply(_this) === false){
                    return false;
                }
                _this.close();
                if(options.onclose){
                    options.onclose.apply(this);
                }
            }).on('click', '.j_dlg_ok', function(){

                });
        },

        setSize: function(){
            var size = {
                width: this.$root.outerWidth(),
                height: this.$root.outerHeight()
            };
            this.$root.css({
                'margin-top' : '-' + (size.height / 2) + 'px',
                'margin-left' : '-' + (size.width / 2) + 'px'
            });
            this._$mask.css({
                height: $(document).height() + 'px'
            });
        },
        /**
         * 打开对话框
         * */
        open: function(){
            this.setSize();
            this.$root.show();
            this._$mask.show();
        },
        /**
         * 关闭对话框
         * */
        close: function(){
            this.$root.hide();
            this._$mask.hide();
            if(this._options.cache === false){ //设置不缓存
                this.$root.remove();
                this._$mask.remove();
            }
        },
        /**
         * 设置标题
         * */
        setTitle: function(title){
            this.$root.find('.ui-dialog-tit em').html(title);
        },
        /**
         * 设置内容
         * */
        setContent: function(content){
            this.$root.find('.ui-dialog-bd').html(content);
            this.setSize();
        }
    });

    Dialog.confirm = function(message, ok, cancel){
        var content = '<div class="ui-dialog-bd">' + message + '</div>';
        content += '<div class="ui-dialog-ft"><button class="button j_ok" href="#">' + IOT.tr('确定') + '</button><button class="button j_cancel" href="#">' + IOT.tr('取消') + '</button></div>';
        var confirmDialog = new IOT.Dialog({
            className: 'ui-dialog-confirm',
            width: '450px',
            content: content,
            showFooter: false,
            cache: false,
            showClose: false
        });
        confirmDialog.$root.on('click', '.button', function(e){
            e.preventDefault();
            var $target = $(this);
            if($target.hasClass('j_ok')){
                ok && ok.call(this);
            }else{
                cancel && cancel.call(this);
            }
            confirmDialog.close();
        });
        confirmDialog.open();
    };

    gl.Dialog = Dialog;
})();

