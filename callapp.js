/**
 * @模块功能        App 唤醒
 * @调用           lib.callapp(o);
 * @功能描述        调用后 先唤醒app 如果用户手机没装app 则跳到下载地址 如果是在微信 则弹出提示 引导用户用浏览器打开
 * 
 * @参数说明：
 * @o             [传入一个对象o 对象可接受 schemeUrl dowmloadUrl scheme package 四个参数]
 * @o.schemeUrl   app打开协议
 * @o.dowmloadUrl app下载地址
 * @o.scheme      app的scheme【app开发人员提供】【https://developer.chrome.com/multidevice/android/intents】
 * @o.package     app 安卓包名【app开发人员提供】【https://developer.chrome.com/multidevice/android/intents】
 * @author        庄焕滨
 * 
 * @备注           安卓和ios的协议必须保持一致
 * @备注           太平洋汽车网客户端APP scheme=pcautobrowser package=cn.com.pcauto.android.browser
 * @备注           有问题联系 zhuanghuanbin@pconline.com.cn
 */
;(function(win, lib) {
	if (lib.callapp) return;
	var ua = navigator.userAgent;
	var browser = {
		isSafari: /Version\/[\d\.]+.*Safari/.test(ua),
		// isChrome: /Chrome/i.test(ua),
		chromeV: ua.match(/Chrome\/(\d+)/),
		isAndroid: /Android/i.test(ua),
		isIOS: /iPhone|iPad|iPod/i.test(ua),
		isWechat: /MicroMessenger/i.test(ua),
		iosVersion: function () {
			if (/iP(hone|od|ad)/.test(navigator.platform)) {
				var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
				return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
			}
			return null;
		}
	};

	function customClickEvent() {
		var clickEvt;
		if (win.CustomEvent) {
			clickEvt = new win.CustomEvent("click", {
				canBubble: true,
				cancelable: true
			});
		} else {
			clickEvt = document.createEvent("Event");
			clickEvt.initEvent("click", true, true);
		}
		return clickEvt;
	}

	/**
	 * 插入微信提示
	 */
	function writeWechatTip() {
		var JwechatTip = document.getElementById("JwechatTip");
		if (!JwechatTip) {
			var styleInner = [
				".wechat-tip{overflow:hidden;width:100%;height:100%;position:fixed;left:0px;top:0px;background-color:#efeff4;z-index:99999;}",
				".wechat-tip-inner{position:relative;margin:0 auto;width:260px;height:210px;top:10%;overflow:hidden;text-align:center;}",
				".wechat-tip-tit{margin:0;font-size:18px;font-weight:700;color:#333;margin-bottom:20px;line-height:30px;}",
				".wechat-tip-step{overflow:hidden;position:relative;}",
				".wechat-tip-step-l{float:left;width:120px;}",
				".wechat-tip-step-r{float:right;width:120px;}",
				".wechat-tip-step-m{width:10px;height:10px;position:absolute;top:30px;left:50%;margin-left:-6px;border-top:3px solid #63B5F6;border-right:3px solid #63B5F6;-webkit-transform:rotate(45deg);-ms-transform:rotate(45deg);transform:rotate(45deg);}",
				".wechat-tip-step-more-android,.wechat-tip-step-more-ios,.wechat-tip-step-web-android,.wechat-tip-step-web-ios{width:40px;height:40px;margin:0px auto 10px;background-image:url(data:image/png;base64,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);-webkit-background-size:80px;background-size:80px;}",
				".wechat-tip-step-more-android{background-position:0px 0px;}",
				".wechat-tip-step-web-android{background-position:-40px 0px;}",
				".wechat-tip-step-more-ios{background-position:0px -40px;}",
				".wechat-tip-step-web-ios{background-position:-40px -40px;}",
				".wechat-tip-step-tit{margin:0;font-size:16px;font-weight:bold;line-height:30px;color:#666;}",
				".wechat-tip-step-des{margin:0;font-size:12px;color:#666;line-height:20px;}"
			].join("");
			var styleEle = document.createElement("style");
			styleEle.type = "text/css";
			styleEle.appendChild(document.createTextNode(styleInner));
			document.getElementsByTagName("head")[0].appendChild(styleEle);

			var divEle = document.createElement("div");
			divEle.className = "wechat-tip";
			divEle.id = "JwechatTip";
			if (browser.isIOS) {
				var wechatMoreClass = "wechat-tip-step-more-ios";
				var wechatWebClass = "wechat-tip-step-web-ios";
				var wechatTip = "选择在Safari中打开";
			} else {
				var wechatMoreClass = "wechat-tip-step-more-android";
				var wechatWebClass = "wechat-tip-step-web-android";
				var wechatTip = "选择在浏览器中打开";
			};
			var html= '<div class="wechat-tip-inner">'
			+ '<p class="wechat-tip-tit">请按照下面的示意图操作打开<br>葫芦里 App</p>'
			+ '<div class="wechat-tip-step">'
			+ '<div class="wechat-tip-step-l">'
			+ '<div class="'+wechatMoreClass+'"></div>'
			+ '<p class="wechat-tip-step-tit">第 1 步</p><p class="wechat-tip-step-des">点击右上角「更多」</p>'
			+ '</div>'
			+ '<div class="wechat-tip-step-m"></div>'
			+ '<div class="wechat-tip-step-r">'
			+ '<div class="'+wechatWebClass+'"></div>'
			+ '<p class="wechat-tip-step-tit">第 2 步</p><p class="wechat-tip-step-des">'+wechatTip+'</p>'
			+ '</div>'
			+ '</div>'
			+ '</div>'
			divEle.innerHTML = html;
			document.body.appendChild(divEle);
			divEle.addEventListener("click",function(){
				divEle.style.display = "none";
			},false);
		}else {
			JwechatTip.style.display = "block";
		};
	}
	var p = (browser.chromeV && browser.chromeV[1]) >= 25 && browser.isAndroid;
	var q = browser.isAndroid && !!ua.match(/samsung/i);
	var r = browser.isSafari && ua.indexOf("OS 9_") > -1;

	lib.callapp = function(o) {
		if (!o || typeof(o) != "object") return;

		// 如果是微信 显示微信提示
		// if (browser.isWechat) {
		// 	writeWechatTip();
		// 	return false;
		// }
		if (typeof(o.dowmloadUrl) != "undefined" && o.dowmloadUrl != "") {
			var time = r ? 2500 : 1000;//如果是ios9，则停留时间长一点，让用户有时间选择打开。
			var d = Date.now();
			var timeload = setTimeout(function() {
				var c = Date.now();
				if (c - d < time + 200) {
					win.location.href = o.dowmloadUrl;
				}
			}, time);
		};

		if (typeof(o.scheme) == "undefined" || o.scheme == "") return;
		if (typeof(o.package) == "undefined" || o.package == "") return;

		if (typeof(o.schemeUrl) != "undefined" && o.schemeUrl != "") {
			if (r) {
				// iOS 9 do not support custom protocal in iframe src
				// http://stackoverflow.com/questions/31891777/ios-9-safari-iframe-src-with-custom-url-scheme-not-working
				setTimeout(function() {
					var JopenScheme = document.getElementById("JopenScheme");
					if (!JopenScheme) {
						JopenScheme = document.createElement("a");
						JopenScheme.id = "JopenScheme";
						JopenScheme.style.display = "none";
						document.body.appendChild(JopenScheme);
					}
					JopenScheme.href = o.schemeUrl;
					JopenScheme.dispatchEvent(customClickEvent());
				}, 100);
			} else if (p || q) {
				o.schemeUrl = o.schemeUrl.replace(/pcautobrowser:/,"intent:") + "#Intent;scheme=" + o.scheme + ";package=" + o.package + ";end";
				setTimeout(function() {
					win.location.href = o.schemeUrl;
				}, 100);
			} else {
				var ifr = document.createElement("iframe");
				ifr.src = o.schemeUrl;
				ifr.style.display = "none";
				document.body.appendChild(ifr);
			};
		};
	}
})(window, window.lib || (window.lib = {}));