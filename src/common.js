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
		$(document).on('click', 'td i.ico8', function(e){
			var me = $(this),
				table = me.closest('table'),
				allCk = table.find('th i.ico8');

			if (me.hasClass('ico9')) {
				me.removeClass('ico9');
				allCk.removeClass('ico9');
			} else {
				me.addClass('ico9');
				if (table.find('td i.ico8:not(.ico9)').length == 0) {
					allCk.addClass('ico9');
				}
			}
		}).on('click', 'th i.ico8', function(e){
			var me = $(this),
				table = me.closest('table');

			if (me.hasClass('ico9')) {
				me.removeClass('ico9');
				table.find('td i.ico9').removeClass('ico9');
			} else {
				me.addClass('ico9');
				table.find('td i.ico8').addClass('ico9');
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
			message: '<div class="load-img icon-spin3 animate-spin"></div>',
			overlayCSS: { 
				opacity: .2
			},
			css: { 
				'left': '50%',
				'width': '200px',
				'margin-left': '-100px',
				'border': '1px solid #000',
				'padding': '5px',
				'-webkit-border-radius': '10px',
				'-moz-border-radius': '10px',
				'opacity': 1,
				'backgroundColor': '#fff',
				'color': '#fff'
			},
			onBlock: handle
		});
	}

	return {
		initPager: initPager,
		initSelect: initSelect,
		initPop: initPop,
		initCheckBox: initCheckBox,
		initQuery: initQuery,
		block: block
	};
}());