/*
	琴弦文字效果
	offset：上下最大的偏移距离
*/
function StringText(el, offset) {
	this.el = el;
	this.offset = offset || 20;
	this.init();
}

StringText.prototype = {
	constructor: StringText,
	init: function () {
		var that = this;
		this.transformLayout();

		var offsetTop = getOffset(this.el).top;


		// 记录开始的位置
		var startT = 0;
		this.el.onmouseover = function (ev) {
			var e = ev || window.event;
			var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
			startT =  e.clientY + scrollTop - offsetTop;
		};

		// 给当前元素添加事件
		this.el.onmousemove = function (ev) {
			var e = ev || window.event;
			var o = e.target || e.srcElement;

			var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

			var disT = scrollTop + e.clientY - offsetTop;

			if(disT != startT) {
				// 判断方向
				var direction = disT > startT ? 1 : -1;

				// 计算当前span的top值
				var curTop = disT - startT;
				// 当当前top值小于设置的最大top值时才允许起作用
				if(Math.abs(curTop) < that.offset) {
					for(var i = 0; i < that.aSpan.length; i++) {
						var otherTop = curTop - Math.abs(i - o.index) * direction;

						if(direction == 1 && otherTop < 0 || direction == -1 && otherTop > 0) {
							otherTop = 0;
						}

						that.aSpan[i].style.top = otherTop + 'px';
					}
				}
			}
		}

		this.el.onmouseout = function () {
			for(var i = 0; i < that.aSpan.length; i++) {
				timeMove(that.aSpan[i], {top: 0}, 500, 'elasticOut');
			}
		};
	},
	transformLayout: function () { // 转换布局
		this.el.style.position = 'relative';

		var text = this.el.innerText;

		this.el.innerHTML = '';
		var aSpan = [];

		for(var i = 0; i < text.length; i++) {
			var oNewSpan = document.createElement('span');
			oNewSpan.innerHTML = text.charAt(i);

			this.el.appendChild(oNewSpan);

			oNewSpan.style.left = oNewSpan.offsetLeft + 'px';
			oNewSpan.style.top  = 0;

			aSpan.push(oNewSpan);

			// 指定序号
			oNewSpan.index = i;
		}

		for(var i = 0; i < aSpan.length; i++) {
			aSpan[i].style.position = 'absolute';
		}

		this.aSpan = aSpan;
	},
};