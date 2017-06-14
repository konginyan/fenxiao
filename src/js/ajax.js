const stream = weex.requireModule('stream');
const storage = weex.requireModule('storage');
const url = 'http://ba.depts.bingosoft.net:8088/';
import buiweex from '../js/buiweex.js'
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
			stream.fetch({
		       method: option.method,
		       type: option.type || 'json',
		       headers: {
		           "Authorization": "Bearer " + token
		       },
		       url: url + option.url + option.data,
		       body: body
		    }, function(res){
		   		
		   		if(res.ok){
					// buiweex.alert(res);
		   			resolve(res.data);
		   			success && success(res.data)
		   		}else{
		   			reject(res.statusText,res.status);
		   			error && error(res.statusText,res.status);
		   		}

			   
			});
		});
	});	
}

function obj2QueryStr(obj) {
    var queryStr = "?";
    for (var key in obj) {
        queryStr += key + "=" + obj[key] + "&";
    }
    return queryStr;
}
