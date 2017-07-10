var stream = weex.requireModule('stream');
import {ssoUrl} from './config.js';
// var ssoEndpoint="https://ba.depts.bingosoft.net:20140/sso";
// const ssoEndpoint="https://10.201.76.141/sso/";
// const ssoEndpoint="https://www.bingolink.biz/sso";

module.exports = {
    //对象转成url查询参数 key=value&key=value
    "obj2QueryStr": function (obj) {
        var queryStr = "";
        for (var key in obj) {
            queryStr += key + "=" + obj[key] + "&";
        }
        return queryStr;
    },
    //将登陆结果转成json对象
    "parseAuthData": function (auth) {
        var result = {};
        var data = auth.split('\n');
        for (var i = 0; i < data.length; i++) {
            var temp = data[i];
            var key, value;
            if (temp != "") {
                var tempArray = temp.split(':');
                key = tempArray[0];
                value = tempArray[1];
                result[key] = value;
            }
        }
        return result;
    },
    // 登录-用户密码方式
    "login": function (username, password, success, fail) {
        var that = this;
        var data = {
            "credential_type": "password",
            "username": username,
            "password": password,
            "openid.ex.client_id": "clientId",
            "openid.ex.client_secret": "clientSecret",
            "openid.ex.get_oauth_access_token": "y",
            "openid.ex.get_service_ticket": "y",
            "openid.ex.get_spec_secret": "y",
            "openid.mode": "checkid_setup"
        };
        var headers = {
            "X-Requested-With": "XMLHttpRequest"
        }
        var temp = ssoUrl + "/v2?" + that.obj2QueryStr(data);
        stream.fetch({
            method: 'GET',
            headers: headers,
            url: ssoUrl + "/v2?" + that.obj2QueryStr(data)
        }, function (resp) {
            if (resp.ok) {
                var auth = that.parseAuthData(resp.data);
                 
                if (auth.error) {
                    fail(auth.error);
                } else {
                    success(auth);
                }
            } else {
                fail(resp.statusText, resp.status);
            }
        });
    },
    //刷新AccessToken
    "refreshAccessToken": function (token,success,fail) {
        var refreshUrl = ssoUrl + "/oauth/2/token?client_id=clientId&grant_type=refresh_token&refresh_token=" + token;
        var headers = {
            "X-Requested-With": "XMLHttpRequest"
        }
        stream.fetch({
            method: 'GET',
            headers: headers,
            url: refreshUrl
        }, function (resp) {
            if (resp.ok) {
                var data=eval('('+resp.data+')');
                success(data);
            } else {
                fail(resp.statusText, resp.status);
            }
        });
    }

}