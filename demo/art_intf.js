!(function() {

    /*
     * 用于加载js
     * fn {Function || variable} : 如果该函数或者变量已经定义，则直接调用回调函数；否则加载指定js
     * src {String}: 要加载的js地址
     * callback {Function} : js加载完毕后的回调函数
     */
    function needJS(fn, src, callback) {
        callback = callback || function() {};
        if (fn) return callback(false);
        var scripts = document.___needJS__ || (document.___needJS__ = []);
        var script = scripts[src] || (scripts[src] = {
            loaded: false,
            callbacks: []
        });
        if (script.loaded) return callback(false);
        var cbs = script.callbacks;
        if (cbs.push(callback) == 1) {
            var js = document.createElement("script");
            js.onload = js.onreadystatechange = function() {
                var st = js.readyState;
                if (st && st != "loaded" && st != "complete") return;
                js.onload = js.onreadystatechange = null;
                script.loaded = true;
                for (var i = 0; i < cbs.length; i++) cbs[i](true);
            };
            js.src = src;
            document.getElementsByTagName("head")[0].appendChild(js);
        }
    }


    function write() {
        // 如果是汽车贷款项目 则不显示
        if (location.href.indexOf("m.jr.pcauto.com.cn") > -1) return false;
        // 如果是汽车参配页【http://m.pcauto.com.cn/auto/****/config.html】 则不显示
        if (/auto\/[\S]*\/config.html/i.test(location.href)) return false;
        // 如果是汽车PK页面 则不显示
        // http://m.pcauto.com.cn/auto/pk/m38239.html
        if (location.href.indexOf("/auto/pk/") > -1) return false;
        // 如果是汽车论坛
        // http://m.pcauto.com.cn/bbs/
        if (location.href.indexOf("m.pcauto.com.cn/bbs") > -1) return false;
        // 如果有topDlAppcookie 则不显示
        if (Cookie.get("topDlApp")) return false;
        // 头部推广
        var head = document.getElementsByTagName("head")[0];
        var body = document.getElementsByTagName("body")[0];
        var topData = {
            "href": "\u0068\u0074\u0074\u0070\u003a\u002f\u002f\u0077\u0077\u0077\u0031\u002e\u0070\u0063\u0061\u0075\u0074\u006f\u002e\u0063\u006f\u006d\u002e\u0063\u006e\u002f\u007a\u0074\u002f\u0067\u007a\u0032\u0030\u0031\u0035\u0031\u0030\u0030\u0038\u002f\u006a\u0075\u006d\u0070\u002f\u006a\u0075\u006d\u0070\u002d\u0077\u0061\u0070\u002e\u0068\u0074\u006d\u006c\u003f\u0061\u0064\u003d\u0035\u0035\u0037\u0036\u0026\u0061\u0070\u0070\u003d\u0070\u0063\u0061\u0075\u0074\u006f\u0026\u0065\u0064\u0069\u0074\u0069\u006f\u006e\u003d\u0050\u0043\u0061\u0075\u0074\u006f\u0077\u0061\u0070\u0064\u0069\u006e\u0067\u0062\u0075",
            "img": "http://www1.pcauto.com.cn/wap/20151214/img/zixun.png",
            "name": "<s></s>\u592a<s></s>\u5e73<s></s>\u6d0b<s></s>\u6c7d<s></s>\u8f66<s></s>\u7f51",
            "des": "<s></s>\u7528<s></s>\u0041<s></s>\u0070<s></s>\u0070<s></s>\u4e70<s></s>\u8f66<s></s>\u7701<s></s>\u94b1<s></s>\u66f4<s></s>\u7701<s></s>\u5fc3<s></s>\uff01",
            "btn": "\u9a6c<s></s>\u4e0a<s></s>\u6253<s></s>\u5f00"
        };
        /*在不同的分类页面声明页面归属类别,该对象属性名为页面分类*/
        var tgAd = {
            "经销商": [5526, "Autoprice-1.4.0-pcautowap001"],
            "优惠": [5527, "Autoprice-1.4.0-pcautowap002"],
            "找车": [5528, "Autoprice-1.4.0-pcautowap003"],
            "车主价格": [5529, "Autoprice-1.4.0-pcautowap004"],
            "工具": [5530, "Autoprice-1.4.0-pcautowap005"],
            "资讯": [5531, "Autoprice-1.4.0-pcautowap006"]
        };
        // 先根据规则把数据整理好，再生成结构
        if (typeof(pageBelong) == "undefined") {
            /*百度阿拉丁用户ad监控*/
            if (Cookie.get("ALDUser")) {
                topData.href = "\u0068\u0074\u0074\u0070\u003a\u002f\u002f\u0077\u0077\u0077\u0031\u002e\u0070\u0063\u0061\u0075\u0074\u006f\u002e\u0063\u006f\u006d\u002e\u0063\u006e\u002f\u007a\u0074\u002f\u0067\u007a\u0032\u0030\u0031\u0035\u0031\u0030\u0030\u0038\u002f\u006a\u0075\u006d\u0070\u002f\u006a\u0075\u006d\u0070\u002d\u0077\u0061\u0070\u002e\u0068\u0074\u006d\u006c\u003f\u0061\u0064\u003d\u0035\u0035\u0037\u0035\u0026\u0061\u0070\u0070\u003d\u0070\u0063\u0061\u0075\u0074\u006f\u0026\u0065\u0064\u0069\u0074\u0069\u006f\u006e\u003d\u0050\u0043\u0061\u0075\u0074\u006f\u0077\u0061\u0070\u0064\u0069\u006e\u0067\u0062\u0075\u0062\u0061\u0069\u0064\u0075";
            } else if (location.href.indexOf("ad=5488") > 0 || location.href.indexOf("ad=5602") > 0 || location.href.indexOf("ad=5603") > 0 || location.href.indexOf("ad=5604") > 0) {
                Cookie.set("ALDUser", 1, 1, "/", "pcauto.com.cn");
                topData.href = "\u0068\u0074\u0074\u0070\u003a\u002f\u002f\u0077\u0077\u0077\u0031\u002e\u0070\u0063\u0061\u0075\u0074\u006f\u002e\u0063\u006f\u006d\u002e\u0063\u006e\u002f\u007a\u0074\u002f\u0067\u007a\u0032\u0030\u0031\u0035\u0031\u0030\u0030\u0038\u002f\u006a\u0075\u006d\u0070\u002f\u006a\u0075\u006d\u0070\u002d\u0077\u0061\u0070\u002e\u0068\u0074\u006d\u006c\u003f\u0061\u0064\u003d\u0035\u0035\u0037\u0035\u0026\u0061\u0070\u0070\u003d\u0070\u0063\u0061\u0075\u0074\u006f\u0026\u0065\u0064\u0069\u0074\u0069\u006f\u006e\u003d\u0050\u0043\u0061\u0075\u0074\u006f\u0077\u0061\u0070\u0064\u0069\u006e\u0067\u0062\u0075\u0062\u0061\u0069\u0064\u0075";
            }
        } else if (pageBelong == "学车") {
            topData.href = "\u0068\u0074\u0074\u0070\u003a\u002f\u002f\u0077\u0077\u0077\u0031\u002e\u0070\u0063\u0061\u0075\u0074\u006f\u002e\u0063\u006f\u006d\u002e\u0063\u006e\u002f\u007a\u0074\u002f\u0067\u007a\u0032\u0030\u0031\u0035\u0030\u0037\u0031\u0034\u002f\u0078\u0063\u0074\u0067\u002f\u0077\u0061\u0070\u002e\u0068\u0074\u006d\u006c\u003f\u0061\u0064\u003d\u0035\u0032\u0034\u0035\u0026\u0063\u006f\u0075\u006e\u0074\u0069\u0064\u003d\u0070\u0063\u0061\u0075\u0074\u006f\u0077\u0061\u0070\u0030\u0032";
            topData.img = "http://www1.pcauto.com.cn/wap/20151214/img/xcbd.png";
            topData.name = "<s></s>\u5b66<s></s>\u8f66<s></s>\u5b9d<s></s>\u5178<s></s>\u0041<s></s>\u0070<s></s>\u0070";
            topData.des = "<s></s>\u79bb<s></s>\u7ebf<s></s>\u770b<s></s>\u5b66<s></s>\u8f66<s></s>\u89c6<s></s>\u9891<s></s>\u0020<s></s>\u5feb<s></s>\u901f<s></s>\u62ff<s></s>\u9a7e<s></s>\u7167<s></s>\uff01";
            topData.btn = "<s></s>\u514d<s></s>\u8d39<s></s>\u5b89<s></s>\u88c5";
        } else {
            topData.href = "http://www1.pcauto.com.cn/zt/gz20151008/jump/jump-wap.html?ad=" + tgAd[pageBelong][0] + "&app=qcbj&edition=" + tgAd[pageBelong][1];
            topData.img = "http://www1.pcauto.com.cn/app/qcbj8080.png";
            topData.name = "<s></s>\u6c7d<s></s>\u8f66<s></s>\u62a5<s></s>\u4ef7<s></s>\u0041<s></s>\u0070<s></s>\u0070";
            topData.des = "<s></s>\u4e70<s></s>\u8f66<s></s>\u597d<s></s>\u5e2e<s></s>\u624b<s></s>\u0020<s></s>\u4f18<s></s>\u60e0<s></s>\u968f<s></s>\u65f6<s></s>\u6709";
            topData.btn = "<s></s>\u9a6c<s></s>\u4e0a<s></s>\u6253<s></s>\u5f00";
        }
        /* 论坛和车友会替换内容 */
        if (location.href.indexOf("bbs") != -1 || location.href.indexOf("club") != -1) {
            topData.href = "\u0068\u0074\u0074\u0070\u003a\u002f\u002f\u0077\u0077\u0077\u0031\u002e\u0070\u0063\u0061\u0075\u0074\u006f\u002e\u0063\u006f\u006d\u002e\u0063\u006e\u002f\u0061\u0070\u0070\u002f\u0064\u006f\u0077\u006e\u006c\u006f\u0061\u0064\u002f\u0032\u0030\u0031\u0034\u0030\u0038\u0031\u0035\u002f\u0063\u0079\u0068\u005f\u0064\u006f\u0077\u006e\u0061\u0070\u0070\u002e\u0068\u0074\u006d\u006c";
            topData.img = "http://www1.pcauto.com.cn/wap/20150814/img/cheyou.png";
            topData.name = "<s></s>\u592a<s></s>\u5e73<s></s>\u6d0b<s></s>\u8f66<s></s>\u53cb<s></s>\u4f1a<s></s>\u0041<s></s>\u0050<s></s>\u0050";
            topData.des = "<s></s>\u73a9<s></s>\u8f6c<s></s>\u8bba<s></s>\u575b<s></s>\uff0c<s></s>\u8d62<s></s>\u5343<s></s>\u5143<s></s>\u6cb9<s></s>\u5361";
            topData.btn = "<s></s>\u9a6c<s></s>\u4e0a<s></s>\u53c2<s></s>\u4e0e";
        }

        function randomString(len) {
            var len = len || 32;
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
            var maxPos = chars.length;
            var pwd = "";
            for (i = 0; i < len; i++) {
                pwd += chars.charAt(Math.floor(Math.random() * maxPos));
            }
            return pwd;
        }
        // 随机类名
        var topClassname = randomString();
        // 生成样式插入
        var topStyle = '.' + topClassname + '{width:100%;height:48px;position:relative}.' + topClassname + ' s{display:none}.' + topClassname + '>div{width:100%;height:48px;background:rgba(233,233,234,.9);vertical-align:top;position:relative;border-bottom:1px solid #ccc;position:fixed;top:0;left:0;z-index:10}.' + topClassname + '>div>span{display:block;width:20px;height:48px;color:#888;text-align:center;line-height:48px;font-size:20px;border-radius:10px;cursor:pointer;position:absolute;left:3px;top:0}.' + topClassname + ' a{display:block;padding:0 10px 0 26px;margin:0 auto;overflow:hidden;cursor:pointer;height:48px}.' + topClassname + ' a i{float:left;width:40px;height:40px;margin:5px 8px 0 0;border-radius:10px;overflow:hidden}.' + topClassname + ' a i img{display:block;width:40px;height:40px;border-radius:10px}.' + topClassname + ' a div{float:left;font-size:15px;height:20px;line-height:20px;margin-top:5px}.' + topClassname + ' a div p:nth-child(1){font-size:15px;color:#333}.' + topClassname + ' a div p:nth-child(2){font-size:12px;color:#777}.' + topClassname + ' a span{display:block;position:absolute;right:10px;top:11px;padding:0 5px;color:#fff;font-size:13px;background:#ff7800;border-radius:4px;height:26px;line-height:26px}';
        var topStyleEle = document.createElement("style");
        topStyleEle.type = "text/css";
        topStyleEle.appendChild(document.createTextNode(topStyle));
        head.appendChild(topStyleEle);
        // 生成结构插入页面
        var topHtml = '<div><a><i><img src="' + topData.img + '"></i><div><p>' + topData.name + '</p><p>' + topData.des + '</p></div><span>' + topData.btn + '</span></a><span>×</span></div>';
        var topDivEle = document.createElement("div");
        topDivEle.className = topClassname;
        topDivEle.innerHTML = topHtml;
        topDivEle.setAttribute("style", "display:block!important;");
        body.insertBefore(topDivEle, body.childNodes[0]);
        // 点击关闭
        topDivEle.querySelector("div>span").addEventListener("click", function() {
            topDivEle.setAttribute("style", "display:none!important;");
            Cookie.set("topDlApp", 1, 1, "/", "pcauto.com.cn");
        }, false);
        // 点击跳链接
        topDivEle.querySelector("a").addEventListener("click", function() {
            // topDivEle.setAttribute("style","display:none!important;");
            Cookie.set("topDlApp", 1, 1, "/", "pcauto.com.cn");
            // location.href = topData.href;
            needJS("", "http://js.3conline.com/wap/pcauto/2016/js/callapp.js", function() {
                lib.callapp({
                    "scheme": "pcautobrowser",
                    "package": "cn.com.pcauto.android.browser",
                    "schemeUrl": typeof(callappScheme) != "undefined" ? callappScheme : "",
                    "dowmloadUrl": topData.href
                });
            })

        }, false);
    }



    // 判断是否 fromPcautoApp参数 有则不显示 无则显示
    window.addEventListener("load", function() {
        if (typeof(fromPcautoApp) == "function") {
            fromPcautoApp(undefined, write);
        } else {
            write();
        };
    }, false);
})();