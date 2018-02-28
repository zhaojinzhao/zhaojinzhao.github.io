/*
	通过ID获取页面元素
*/
function $(id) {
	return document.getElementById(id);
}

/*
	获取页面元素相对于页面左侧和上侧的距离
*/
function getOffset(obj) {
	var offset = {left:0, top: 0};

	do{
		offset.left += obj.offsetLeft;
		offset.top  += obj.offsetTop;
		obj = obj.offsetParent;
	}while(obj);

	return offset;
}

/*
	获取页面元素属性值
*/
function getStyle(obj, attr) {
	if(obj.currentStyle) {
		return obj.currentStyle[attr];
	} else {
		return getComputedStyle(obj, false)[attr];
	}
}

/*
	时间版运动框架
	obj：运动物体
	target：运动属性和终点值的集合
	times：运动花费的时间
	fx：运动样式
	fn：回调函数
*/
function timeMove(obj, target, times, fx, fn) {
	clearInterval(obj.timer);

	// 获取运动属性的当前值
	var cur = {};
	for(var attr in target) {
		if(attr == 'opacity') {
			cur[attr] = getStyle(obj, attr) * 100;
		} else {
			cur[attr] = parseInt(getStyle(obj, attr)) || 0;
		}
	}

	// 记录当前时间
	var startTime = new Date().getTime();

	// 开启新的定时器
	obj.timer = setInterval(function () {
		var changeTime = new Date().getTime() - startTime;

		// 判断是否运动时间结束
		if(changeTime >= times) {
			changeTime = times;
			clearInterval(obj.timer);
			fn && fn();
		}

		for(var attr in target) {
			var current = Tween[fx](changeTime, cur[attr], target[attr] - cur[attr] , times);
			if(attr === 'opacity') {
				obj.style.opacity = current / 100;
				obj.style.filter = 'alpha(opacity=' + current + ')';
			} else {
				obj.style[attr] = current + 'px';
			}
		}
	}, 30);
}
