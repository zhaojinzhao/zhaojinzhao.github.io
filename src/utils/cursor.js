/*
	操作文本框中的光标
*/
(function () {
	var Cursor = function (el) {
		this.el = el;
	};

	Cursor.prototype = {
		constructor: Cursor,
		getCursorPosition: function () { // 获取光标位置
			var start = 0;
			if(document.selection) {
				// 获取光标（这句不能少）
				this.el.focus();
				var range = document.selection.createRange();
				// 复制一份
				var sr = range.duplicate();
				sr.moveToElementText(this.el);
				sr.setEndPoint('EndToEnd', range);

				start = sr.text.length - range.text.length;
			} else if(this.el.selectionStart) {
				start = this.el.selectionStart;
			}
			return start;
		},
		setCursorPosition: function (pos) { // 设置光标位置
			this.setCursorSelectText(pos, pos);
		},
		setCursorSelectText: function (start, end) { // 设置光标选中文本
			// 开始位置支持小于0
			if(start < 0) {
				start = this.el.value.length + start;
			}
			// 结束位置支持小于0
			if(end < 0) {
				end = this.el.value.length + end;
			}
			// 如果开始位置大于结束位置则交换位置
			if(start > end) {
				var temp = start;
				start = end;
				end = temp;
			}

			if(this.el.setSelectionRange) {
				this.el.focus();
				this.el.setSelectionRange(start, end);
			} else if(this.el.createTextRange) { // 兼容IE
				var range = this.el.createTextRange();
				range.collapse(true);
				range.moveEnd('character', end);
				range.moveStart('character', start);
				range.select();
			}
		},
		getCursorSelectText: function () { // 获取光标选中文本
			var text = '';
			if(document.selection) { // 只有IE6-10支持
				text = document.selection.createRange().text;
			} else {
				var start = this.el.selectionStart;
				var end   = this.el.selectionEnd;
				text = this.el.value.substring(start, end);
			}
			return text;
		}
	};

	// 注册全局变量
	window.Cursor = Cursor;
})();