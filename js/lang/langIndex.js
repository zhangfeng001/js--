readCookies()//初始化
//写入cookie函数
function setCookie(name, value) {
	var Days = 30;
	var exp = new Date();
	exp.setTime(exp.getTime() + Days * 24 * 60 * 60 * 1000);
	document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}
//获取cookie
function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if(arr = document.cookie.match(reg))
		return unescape(arr[2]);
	else
		return null;
}
function readCookies() {
	let nodes = document.getElementsByTagName("lan");
	for( let i = 0;i<nodes.length;i++){
		var me = nodes[i];
		var a = me.getAttribute('set-lan').split(':');
		var p = a[0]; //文字放置位置
		var m = a[1]; //文字的标识
		//用户选择语言后保存在cookie中，这里读取cookie中的语言版本
		var lan = getCookie('lan');
		//选取语言文字
		switch(lan) {
			case 'ja':
				var t = ja[m]; //这里cn[m]中的cn是上面定义的json字符串的变量名，m是json中的键，用此方式读取到json中的值
				break;
			case 'en':
				var t = en[m];
				break;
			default:
				var t = cn[m];
		}

		//如果所选语言的json中没有此内容就选取其他语言显示
		if(t == undefined) t = cn[m];
		if(t == undefined) t = en[m];
		if(t == undefined) t = ja[m];
		if(t == undefined) return true; //如果还是没有就跳出
		//文字放置位置有（html,val等，可以自己添加）
		switch(p) {
			case 'html':
				me.innerHTML = t;
				break;
			case 'val':
				me.val(t);
				break;
			case 'value':
				me.val(t);
				break;
			default:
				me.innerHTML = t;
		}
	};
}

