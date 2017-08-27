var pagePub = {
    $$: function(a) {
        return document.getElementById(a)
    },
    on: function(c, b, a) {
        if (document.addEventListener) {
            c.addEventListener(b, a, false)
        } else {
            c.attachEvent("on" + b, a)
        }
    },
    setCookie: function(a, c, e, b, d) {
        document.cookie = encodeURIComponent(a) + "=" + encodeURIComponent(c) + ("; expires=" + new Date(new Date().getTime() + ((!!e) ? e * 1 : 1) * 24 * 60 * 60 * 1000).toGMTString()) + ((!!d) ? "; path=" + d : "/") + ((!!b) ? "; domain=" + b : "domain=" + window.location.host)
    },
    getCookie: function(a) {
        return decodeURIComponent(document.cookie.replace(new RegExp(".*(?:^|; )" + encodeURIComponent(a) + "=([^;]*).*|.*"), "$1"))
    },
    needJS: function(d, f, g) {
        g = g || function() {};
        if (d) {
            return g(false)
        }
        var a = document._____needjs_____ || (document._____needjs_____ = []);
        var b = a[f] || (a[f] = {
            loaded: false,
            callbacks: []
        });
        if (b.loaded) {
            return g(false)
        }
        var c = b.callbacks;
        if (c.push(g) == 1) {
            var e = document.createElement("script");
            e.onload = e.onreadystatechange = function() {
                var h = e.readyState;
                if (h && h != "loaded" && h != "complete") {
                    return
                }
                e.onload = e.onreadystatechange = null;
                b.loaded = true;
                for (var j = 0; j < c.length; j++) {
                    c[j](true)
                }
            };
            e.src = f;
            document.getElementsByTagName("head")[0].appendChild(e)
        }
    }
};

var Area_relate = {
    
    dealerNumIpDis: function(cityId) {
        var _areaId = TOPCHANNEL == '汽车报价' ? CITYID : cityId;
        if (_areaId) {
            pagePub.needJS('', 'http://price.pcauto.com.cn/interface/common/serialGroup_info.jsp?sid='+SID+'&rid=' +_areaId+'&getDealerCount=1&terminal=1&callback=Area_relate.dealerNum',function() {
                if(document.getElementById("JdealerCount").style.display != "none"){
                    document.getElementById("JdealerCount").href = 'http://m.pcauto.com.cn/auto/dealer-c'+_areaId+'-sg'+SID+'.html#ad=5413';
                }
            });
        }
    },    
    
    dealerNum: function(data){//获取经销商报价数量
        if(data){           
            var dealerCount = data.dealerCount,
                dealerLink = document.getElementById("JdealerCount"),
                adTxt = document.getElementById("JadTxt"),
                ad = data.ad;
            
            if(dealerCount && dealerCount > 0){
                document.getElementById("JdealerNum").innerHTML = dealerCount;
                dealerLink.style.display = "block"; 
            }else{
                dealerLink.style.display = "none";  
            }
            
            //车系下方文字链推广
            if(adTxt && ad && ad != "" ){
                adTxt.style.display = "block";
            }
            
        }
    },

    actIpDis:function(cityId){
        var _areaId = TOPCHANNEL == '汽车报价' ? CITYID : cityId;
        if (_areaId) {
            pagePub.needJS('', 'http://mall.pcauto.com.cn/autoMall/interface/auto_mall_gct_activity_json.jsp?regionId=' +_areaId+'&serialGroupId='+SID+'&showType=1&max=1&source=1&callback=Area_relate.act');          
        }
    },
    act:function(data){
        var actDom = document.getElementById("Jacts");
        if(actDom){
            var gcts = data.gcts,activitys = data.activitys,len1 = gcts.length,len2 = activitys.length;
            if(len1 > 0){
                var itemData = gcts[0];
                actDom.innerHTML = '<em class="tag">活动</em>' + itemData.title;
                actDom.href = itemData.url + "#ad=5411";
                actDom.style.display = "block";
            }else if(len1 <= 0 && len2 > 0){
                var itemData = activitys[0];
                actDom.innerHTML = '<em class="tag">活动</em>' + itemData.title;
                actDom.href = itemData.url + "#ad=5411";
                actDom.style.display = "block"; 
            }else{
                actDom.style.display = "none";
            }
        }
    }
}
var jsList_ = [{
    id: "Jrela",//经销商个数
    js: "Location.init(function(location){Area_relate.dealerNumIpDis(location.regionCity);});"
}, {
    id: "Jcmt",//购车团活动，无则露出购车券，否则隐藏
    js: "Location.init(function(location){Area_relate.actIpDis(location.regionCity);});"
},{
    id: "bdshare_warp",
    js: "pagePub.needJS('','http://js.3conline.com/ue/share/auto/x/bd_share_allin_v3a.js');"
}, {
    id: "Jcmt",
    js: "pagePub.needJS('','http://js.3conline.com/wap/pcauto/common/cmt/auto-min.js');"
}, {
    id: "sldApp",
    js: "doSldApp();"
}];

pagePub.on(document,"DOMContentLoaded",function(){ 
    var xx = Lazy.create({
        lazyId: "Jlazy_img",
        trueSrc: 'src2',
        offset: 300, //不设置则默认当前浏览器半屏高度
        jsList: jsList_,
        delay: 100, //该毫秒时间内触发则延时100毫秒再加载
        delay_tot: 1000 //超过该毫秒时间触发则直接加载
    });
    Lazy.init(xx);
    initOthers();
    //处理行情模块 , 使之符合炫版结构
    var priceBox3s = document.querySelectorAll(".priceBox3");
    if (priceBox3s.length == 0) return;
    for (var i = 0, len = priceBox3s.length; i < len; i++) {
        (function(m) {
            var tels = priceBox3s[m].querySelectorAll(".tel")
            for (var u = 0, len = tels.length; u < len; u++) {
                tels[u].innerHTML = '<a href="tel:' + tels[u].querySelector("em").innerHTML + '">' + tels[u].innerHTML + '</a>';
            }
        })(i)
    }
});

/*重置 登录 入口的href*/
function setLoginHref(){
    var loginbtns = document.querySelectorAll('.comment .c-user a'),
        loginbtn_len = loginbtns.length,
        localhref = window.location.href;
    for (var i = 0; i < loginbtn_len; i++) {
        loginbtns[i].href = "http://m.pcauto.com.cn/my/passport/login.jsp?return=" + localhref;
    };
}

// 应用推荐滑动
function doSldApp() {
    if ('function' != typeof(swipe)) return;
    swipe(document.getElementById('sldApp'), {
        nav: document.querySelector("#sldApp .m-sld-ctrl"),
        auto: 4000,
        continuous: true
    });
}

// 弹窗function
function hideTopTip() {
    var e = document.getElementById("JtopTipMsg");
    e && setTimeout(function() {
        e.style.opacity = "0";
        setTimeout(function() {
            e.style.display = "none";
        }, 300);
    }, 1500);
}

function showTopTip(msg) {
    var t = document.getElementById("JtopTipMsg");
    t || (t = document.createElement("div"), t.id = "JtopTipMsg", 
        t.className += ' m-tip-msg', 
        document.body.appendChild(t));
    t.innerHTML = msg;
    t.style.display = "block";
    setTimeout(function() {
        t.style.opacity = "1";
    }, 0);

    hideTopTip();
}

// 异步加载
function getJson(url, fn, callbackName) {
    if (url.indexOf("?") != -1) {
        var url = url + '&callback=' + callbackName;
    } else {
        var url = url + '?callback=' + callbackName;
    }
    window[callbackName] = fn;
    var head = document.getElementsByTagName("head")[0];
    var script = document.createElement("script");
    script.src = url;
    script.onload = script.onreadystatechange = function() {
        var f = script.readyState;
        if (f && f != "loaded" && f != "complete") return;
        script.onload = script.onreadystatechange = null;
        head.removeChild(script);
        delete window[callbackName];
    };
    head.appendChild(script);
}


//显示评论数
function showCmtNum(){
    var script = document.createElement('script');
    script.src = CommentNS.nextPageUrl + '?encodeHtml=1&urlHandle=1&url=' + CommentNS.artUrl + '&pageSize=1&callback=parseCmtCount';
    document.getElementsByTagName('head')[0].appendChild(script);
    // use comment meta data to modify page
    window.parseCmtCount = function(data) {
        if (data.error) return;
        var cmtCount = document.getElementById('cmtCount'),
            cmtPage = document.getElementById('cmtPage'),
            slideCmtCount = document.getElementById('JslideCmtCount'),
            cmtUrl = 'http://www.pcauto.com.cn/3g/wap2013/x/cmt/?' + CommentNS.artUrl + '&' + encodeURI(CommentNS.artTitle);

        if (cmtCount) {
            cmtCount.innerHTML = '评论(' + data.total + ')';
            cmtCount.href = cmtUrl;
        }
        if (cmtPage) {
            cmtPage.innerHTML = ' (共' + data.total + '条)';
            cmtPage.href = cmtUrl;
        }
        if (slideCmtCount) { //读图模式添加评论
            slideCmtCount.innerHTML = '评论(' + data.total + ')';
            slideCmtCount.href = cmtUrl;
        }
    }
}



// 初始化
function initOthers() {
    // 回顶部
    var btnTop = document.getElementById('btnTop');
    if(btnTop) {
        btnTop.addEventListener('click',function(){
            window.scrollTo(0,0);
        },false);
    }
    /*重置登录入口*/
    setLoginHref();
    
    // 收藏
    var Jcollect = document.getElementById('Jcollect');
    if (Jcollect) {
        var ART_ID = Jcollect.getAttribute('data-art') || '';
        var COLLECT_URL = 'http://bip.pcauto.com.cn/intf/article.jsp?siteId=2&articleId=' + ART_ID + '&act=';
        var COLLECT_CLASS = 'sInfo-opt';
        var COLLECTED_CLASS = 'sInfo-opt sInfo-opted';
        var collectFlag = true;

        // 判断用户是否已收藏该文章
        getJson(COLLECT_URL + 'isCollect', function(json) {
            if (1 == json.code) {
                // 已收藏
                Jcollect.className = COLLECTED_CLASS;
                Jcollect.innerHTML = '已收藏';
                collectFlag = false;
            } else {
                // 其他情况
                Jcollect.className = COLLECT_CLASS;
                Jcollect.innerHTML = '收藏';
                collectFlag = true;
            }
        }, 'getCollectMsg');

        // 收藏或取消收藏绑定
        Jcollect.onclick = function() {
            var act = collectFlag ? 'addArtCollect' : 'delMyCollection';
            getJson(COLLECT_URL + act, function(json) {
                if (0 == json.code) {
                    // 成功
                    if (collectFlag) {
                        Jcollect.className = COLLECTED_CLASS;
                        Jcollect.innerHTML = '已收藏';
                        collectFlag = false;
                        showTopTip('收藏成功');
                    } else {
                        Jcollect.className = COLLECT_CLASS;
                        Jcollect.innerHTML = '收藏';
                        collectFlag = true;
                        showTopTip('取消收藏');
                    }
                } else if (1 == json.code) {
                    // 已收藏
                    ('addArtCollect' == act) ? showTopTip('原已收藏') : '';
                } else {
                    // 失败
                    if (-1 != json.message.indexOf('登录')) {
                        showTopTip('请登录后操作');
                    } else {
                        collectFlag ? showTopTip('收藏失败') : showTopTip('取消收藏失败');
                    }
                }
            }, 'getCollectMsg');
        }
        
    } // if Jcollect

    // 显示评论数
    showCmtNum();
}



 //读图模式
function picMod(){
    //加载图片  
    function loadImg(curPic) {
        var url = curPic.getAttribute("src2");
        if (url) {
            curPic.setAttribute("src", url);
            curPic.removeAttribute("src2");
        }
    }
        
    //图片张数
    function render(index, total, slideNum) {
        slideNum.innerHTML = (index * 1 + 1) + "/" + total;
    }

    //图片转换
    function converse(url) {
        var picUrl = url,
            reg = new RegExp("(http:\\/\\/img[0-3]?)\\.(pcgames|pconline|pclady|pcauto|pchouse|pcbaby)\\.(.*)\\/([^\\/]*)$", "g"),
            toUrl = picUrl.replace(/(_500|_600|_thumb)(?=.jpg|.gif|.png|.bmp)/, "").replace(reg, "$1w.$2.$3/spcgroup/width_800,qua_30/$4")
        return toUrl;
    }

    //增加节点
    function appendDom(toUrl,parentDom) {
        var aEle = document.createElement("a");
        aEle.className = "pic";
        aEle.innerHTML = '<img src2='+toUrl+' src="http://www1.pcauto.com.cn/wap/2013/touch/img/loading.gif" class="lazy-img">';
        parentDom.appendChild(aEle);
    }

    //删除向前加载属性标识
    function delUnloadFlag(obj) {
        if (obj.getAttribute("data-front")) {
            obj.removeAttribute("data-front");
        }
    }   

    function scroFix(obj) {
        var slideElem = document.getElementById("Jslider"),
            slideWrap = document.getElementById("Jslider-wrap"),
            slideCon = document.querySelector(".swipe-con"),
            slideNum = document.getElementById("JslideNum"),
            slideBack = document.getElementById("JslideBack"),
            hqBtn = document.getElementById("JhqBtn"),
            wrap = document.getElementById("Jlazy_img"),
            htmlDom = document.querySelector("html"),
            bodyDom = document.querySelector("body"),
            startRank = parseInt(obj.getAttribute("index")),
            startIndex = startRank - 1,
            pageSize = 30,
            totalLen = 0,
            curImg = obj.getAttribute("src");
            historyTop = document.body.scrollTop,
            onorientationEvt = "onorientationchange" in window ? "orientationchange" : "resize";
        slideElem.style.display = "block";
        wrap.style.display = "none";
        bodyDom.style.background = "#000";
        slideElem.style.height = bodyDom.style.height = htmlDom.style.height = "100%";
        if (hqBtn) {
            hqBtn.style.display = "none";
        }

        function slide() {
            window.fullPicSlide = swipe(slideWrap, {
                startSlide: startIndex,
                continuous: false,
                disableScroll: true,
                callback: function(index, elem) {
                    window.scrollTo(0, 0);

                    var sizes = window.fullPicSlide && fullPicSlide.getNumSlides();
                    if (sizes && (index==sizes-5) && (sizes < totalLen)) {
                        backwardsAppendPic();
                    }

                    var img = document.querySelectorAll("#Jslider-wrap img"),
                        prevFlag = index - 5;
                    if(prevFlag > 0 && img[prevFlag].getAttribute("data-front")){
                        forwardppendPic();
                    }
                    
                    render(index, totalLen, slideNum);

                    //预加载前后一张
                    var nextPic = img[index+1],
                        prevPic =   img[index-1];
                    if(sizes && index <= sizes-1){
                        if(nextPic){
                            loadImg(nextPic);
                        }
                        if(prevPic){
                            loadImg(prevPic);
                        }
                    }
                }
            }); 
        }
        
        var imgDom,
            backwardsStart = startRank <= 30 ? 1 : startRank - 10,
            forwardStart = startRank > 30 ? (startRank - 30) : 1,
            forwardPageSize = pageSize;

        //点击从第N张开始
        function frontPicDom() {
            for(var i = 0; i < startRank; i++) {
                var aEle = document.createElement("a");
                aEle.className = "pic";
                aEle.innerHTML = '<img data-front="1" src="http://www1.pcauto.com.cn/wap/2013/touch/img/loading.gif" class="lazy-img">';
                slideCon.appendChild(aEle);
            }
            imgDom = document.querySelectorAll("#Jslider-wrap img");
            
        }
        frontPicDom();

        function loadPic() {
            if (backwardsStart == 1) {
                firstPageSize = pageSize + 5;//点击达到加载临界点，向后多加载5张
            } else {
                firstPageSize = pageSize;
            }
            getJson('http://ks.pcauto.com.cn/search.jsp?appName=auto_cms_photo&q=id:'+ARTID+'&return=id_pic,src_url&highlight=false&returnType=json&mustquery=y&start='+backwardsStart+'&perPage='+firstPageSize+'&sort=id_pic-int:asc',function(data) {
                var picData = data.documents,
                loadLen = picData.length;
                totalLen = data.total;
                backwardsStart = data.start + loadLen;
                if (loadLen > 0) {
                    for (var i = 0; i < loadLen; i++) {
                        var curPic = picData[i],
                            picUrl = curPic.src_url,
                            picRank = curPic.id_pic,
                            toUrl = converse(picUrl);
                        if (picRank <= startRank) {//图片节点已经存在
                            var imgElem = imgDom[picRank-1];
                            imgElem.setAttribute("src2",toUrl);
                            delUnloadFlag(imgElem);
                        } else {//图片节点不存在
                            appendDom(toUrl,slideCon);
                        }
                    }
                }
                slide();
                fullPicSlide.setup();
            },"dataCall");
        }               
        loadPic();
        
        //向前添加图片
        function forwardppendPic() {
            getJson('http://ks.pcauto.com.cn/search.jsp?appName=auto_cms_photo&q=id:'+ARTID+'&return=id_pic,src_url&highlight=false&returnType=json&mustquery=y&start='+forwardStart+'&perPage='+forwardPageSize+'&sort=id_pic-int:asc',function(data) {
                var picData = data.documents,
                loadLen = picData.length,
                loadStart = data.start;
                if (loadStart - loadLen > 0) {
                    forwardStart = loadStart - loadLen;
                } else {
                    forwardStart = 1;
                    forwardPageSize = loadStart; 
                }
                if (loadLen > 0) {
                    var lastLoad = loadLen - 1;
                    for (var i = 0; i < loadLen; i++) {
                        var curPic = picData[i],
                            picUrl = curPic.src_url,
                            picRank = curPic.id_pic,
                            toUrl = converse(picUrl),
                            imgElem = imgDom[picRank-1];
                            imgElem.setAttribute("src2",toUrl);
                            delUnloadFlag(imgElem);
                    }
                }
                fullPicSlide.setup();
            },"dataCall");
        }

        //向后添加图片
        function backwardsAppendPic() {
            getJson('http://ks.pcauto.com.cn/search.jsp?appName=auto_cms_photo&q=id:'+ARTID+'&return=id_pic,src_url&highlight=false&returnType=json&mustquery=y&start='+backwardsStart+'&perPage='+pageSize+'&sort=id_pic-int:asc',function(data) {
                var picData = data.documents,
                loadLen = picData.length;
                backwardsStart = data.start + loadLen;
                if (loadLen > 0) {
                    var lastLoad = loadLen - 1;
                    for (var i = 0; i < loadLen; i++) {
                        var curPic = picData[i],
                            picUrl = curPic.src_url,
                            picRank = curPic.id_pic,
                            toUrl = converse(picUrl);
                            appendDom(toUrl,slideCon);
                    }
                }
                fullPicSlide.setup();
            },"dataCall");
        }
        
        slideElem.addEventListener("touchmove", function(e) {
            if (e.touches.length > 1) {
                e.preventDefault();
            }
        }, false);  

        function closeBigPic() {
            slideElem.style.display = "none";
            wrap.style.display = "";
            bodyDom.style.background = "";
            slideElem.style.height = bodyDom.style.height = htmlDom.style.height = "";
            if (hqBtn) {
                hqBtn.style.display = "block";
            }
            fullPicSlide.kill();
            slideCon.innerHTML = "";
            window.scrollTo(0, historyTop);
        }
        slideBack.addEventListener("click", closeBigPic, false);
        slideWrap.addEventListener("click", closeBigPic, false);
        window.addEventListener(onorientationEvt, function() {
            window.scrollTo(0, 0);
        }, false);
    }
    var allImgs = document.getElementById("JartCon").getElementsByTagName("img");
    for (var j = 0; j < allImgs.length; j++) {
        allImgs[j].addEventListener("click", function() {
            //点击统计
            var parentDom = this.parentNode.tagName.toLowerCase();
            if (parentDom != "a") {
                var img = new Image;
                img.src = "http://acount.pcauto.com.cn/wzcount/artbrowse.php?id=CNT1938&response=1";
            }           
            scroFix(this);
        });
    }
}

// 百度阿拉丁用户ad检测 + 唤醒app
(function() {
    var oTgAppBtn = document.getElementById("JtgAppBtn");
    var oTgAppBtn2 = document.getElementById("JtgAppBtn2");
    // 默认url
    var URL_DEFAULT = "http://www1.pcauto.com.cn/zt/gz20151008/jump/jump-wap.html?ad=5586&app=pcauto&edition=PCautowap06";
    // 阿拉丁url
    var URL_ALADING = "http://www1.pcauto.com.cn/zt/gz20151008/jump/jump-wap.html?ad=5585&app=pcauto&edition=PCautowap06baidu";
    // 最后的url
    var URL_SELECT = URL_DEFAULT;

    var locHref = window.location.href;
    if (Cookie.get("ALDUser")) {
        URL_SELECT = URL_ALADING;
    } else if (-1 != locHref.indexOf("ad=5488") || -1 != locHref.indexOf("ad=5602") || -1 != locHref.indexOf("ad=5603") || -1 != locHref.indexOf("ad=5604")) {
        Cookie.set("ALDUser", 1, 1, "/", "pcauto.com.cn");
        URL_SELECT = URL_ALADING;
    }

    function fn_cli() {
        pagePub.needJS("", "http://js.3conline.com/wap/pcauto/2016/js/callapp.js", function() {
            lib.callapp({
                "scheme":"pcautobrowser",
                "package":"cn.com.pcauto.android.browser",
                "schemeUrl": typeof(callappScheme) != "undefined" ? callappScheme : "",
                "dowmloadUrl": URL_SELECT
            });
        });
    }
    oTgAppBtn.addEventListener("click", fn_cli, false);
    oTgAppBtn2.addEventListener("click", fn_cli, false);
})();