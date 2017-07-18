const stream = weex.requireModule('stream');
const storage = weex.requireModule('storage');
const link = weex.requireModule('LinkModule');
import {url} from './config.js';
// const url = 'http://ba.depts.bingosoft.net:8088/';
// const url = 'https://ba1.bingocc.com/';
// import buiweex from '../js/buiweex.js'
export default function ajax(option,success,error) {
	return new Promise(function(resolve,reject) {
		storage.getItem('token',function(e) {
		    var token = e.data,
		    	body = '';
		    option.method = option.method || "GET"
		    option.data = obj2QueryStr(option.data);
			if (option.method === 'GET') {
				
			}else if(option.method === 'POST'){
				body = option.data;
			}

			var reqParams={
		       method: option.method,
		       type: option.type || 'json',
		       headers: {
		           "Authorization": "Bearer " + token
		       },
		       url: url + option.url + option.data,
		       body: body
		    };

			stream.fetch(reqParams, function(res){
		   		if(res.ok){
		   			resolve(res.data);
		   			success && success(res.data)
		   		}else{
		   			if(res.status==401){
		   				//重新刷新Token
		   				link.refreshToken([],function(obj){
		   					var newToken=obj.accessToken;
		   					storage.setItem("token",newToken);
		   					//重发请求
		   					retry(newToken,reqParams,resolve,reject,success,error);
		   				},function(e){
		   					//刷新Token失败的情况
		   					error && error(res.statusText,res.status,res);
		   				}); 

		   			}else{
		   				reject(res.statusText,res.status,res);
		   				error && error(res.statusText,res.status,res);
		   			}
		   		}
			});
		});
	});	
}

function retry(token,reqParams,resolve,reject,success,error){
	reqParams.headers["Authorization"]="Bearer " + token;
	stream.fetch(reqParams, function(res){
		   		if(res.ok){
		   			resolve(res.data);
		   			success && success(res.data)
		   		}else{
		   			reject(res.statusText,res.status,res);
		   			error && error(res.statusText,res.status,res);
		   		}
	});
}

function obj2QueryStr(obj) {
    var queryStr = "?";
    for (var key in obj) {
        queryStr += key + "=" + obj[key] + "&";
    }
    return queryStr;
}
