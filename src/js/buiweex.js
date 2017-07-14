/**
 * 框架中常用的工具方法
 */

var modal = weex.requireModule('modal');
var animation = weex.requireModule('animation');
var navigator = weex.requireModule('navigator');
var navigatorEx = weex.requireModule("NavigatorExModule");

var common = {
    "toast": function (msg) {
        modal.toast({
            message: msg,
            duration: 0.4
        })
    },
    "alert": function (msg, callback, option) {
        var okTitle = "确定";
        if (option) {
            if (option.okTitle)
                okTitle = option.okTitle;
        }
        modal.alert({
            message: msg,
            duration: 0.4,
            okTitle: okTitle
        }, function (value) {
            callback && callback(value);
        });
    },
    "confirm": function (msg, callback, option) {
        var okTitle = "确定", cancelTitle = "取消";
        if (option) {
            if (option.okTitle)
                okTitle = option.okTitle;
            if (option.cancelTitle)
                cancelTitle = option.cancelTitle;
        }
        modal.confirm({
            message: msg,
            duration: 0.4,
            okTitle: okTitle,
            cancelTitle: cancelTitle,
        }, function (value) {
            callback && callback(value);
        });
    },
    /*"show": function (params, callback) {
        var el = params.id;
        if (!el) {
            return;
        }
        var duration = params.duration;
        var transform = params.transform || 'translate(0, 0)';
        var transformOrigin = params.transformOrigin || 'center center';
        var timingFunction = params.timingFunction || 'ease';

        animation.transition(el, {
            styles: {
                opacity: '1',
                transform: transform,
                transformOrigin: transformOrigin
            },
            duration: duration || 0,
            timingFunction: timingFunction,
            delay: 0
        }, function () {
            callback && callback();
        });
    },*/
    "hide": function (params, callback) {
        var el = params.id;
        if (!el) {
            return;
        }
        var duration = params.duration;
        var transform = params.transform || 'translate(0, 0)';
        var transformOrigin = params.transformOrigin || 'center center';
        var timingFunction = params.timingFunction || 'ease';

        animation.transition(el, {
            styles: {
                opacity: '0',
                transform: transform,
                transformOrigin: transformOrigin
            },
            duration: duration || 0,
            timingFunction: timingFunction,
            delay: 0
        }, function () {
            callback && callback();
        });
    },
    "getContextPath": function () {
        var url;
        var bundleUrl = weex.config.bundleUrl;
        url = bundleUrl.split('/').slice(0, -1).join('/');
        return url;
    },
    "push": function (url, params) {
        var paramsStr = "";
        if (params) {
            for (var key in params) {
                paramsStr += key + "=" + encodeURIComponent(params[key]) + "&";
            }
        }
        if (url.indexOf('?') < 0) {
            url += "?";
        }
        url += paramsStr;
       /* navigator.push({
            url: url,
            animated: 'true'
        }, function (e) {
        })*/
        try {
            navigatorEx.push(url);
        } catch (ex) {
            navigator.push({
                url: url,
                animated: 'true'
            }, function (e) {
            });
        }

    },
    "pop": function () {
        navigator.pop({
            animated: 'true'
        }, function (e) {
        });
    },
    "getPageParams": function () {
        var params = {};
        var url = weex.config.bundleUrl;
        var index = url.indexOf("?");
        // this.alert(url);
        if (index > 0) {
            var query = url.substring(index + 1);
            var temp = query.split('&');
            var key, value;
            for (var p in temp) {
                if (temp[p]) {
                    key = temp[p].split('=')[0];
                    value = decodeURIComponent(temp[p].split('=')[1]);
                    params[key] = value;
                }
            }
        }
        return params;
    },
    "obj2QueryStr": function (obj) {
        var queryStr = "";
        for (var key in obj) {
            queryStr += key + "=" + obj[key] + "&";
        }
        return queryStr;
    },
    "show": function (obj,params) {
        var id = params.id;
        var duration = params.duration;
        var transform = params.transform || 'translate(0, 0)';
        var transformOrigin = params.transformOrigin || 'center center';
        var timingFunction = params.timingFunction || 'ease';
        var delay = params.delay || 0
        var opacity = params.opacity || 1;
        var el = obj.$refs[id];
        animation.transition(el, {
            styles: {
                opacity: opacity,
                transform: transform,
                transformOrigin: transformOrigin
            },
            duration: duration || 0,
            timingFunction: timingFunction,
            delay: delay
        }, function () {

        })
    },
    animate (el = '',options = {},fn=function(){}) {

        let defaultOptions = {
            styles : {

            },
            duration : 500,
            timingFunction : 'ease',
            delay : 0,
        }

        let opt = Object.assign({},defaultOptions,options);
        animation.transition(el, opt, function () {
            fn && fn();
        })
    }
}

module.exports = common;