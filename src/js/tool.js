const storage = weex.requireModule('storage');
import buiweex from './buiweex.js';
import {url} from './config.js';
export function unicode(str){

        var value='';
            for (var i = 0; i < str.length; i++) {
                value += '\\u' + left_zero_4(parseInt(str.charCodeAt(i)).toString(16));
            }
            return value;
        }

function left_zero_4(str) {
    if (str != null && str != '' && str != 'undefined') {
        if (str.length == 2) {
            return '00' + str;
        }
    }
    return str;
}



	/**
 * 时间格式化
 * @param {} format
 * @return {}
 * demo new Date('2016-08-20T14:25:39+08:00').formatDate('yyyy-MM-dd hh:mm:ss');
 	formatDate(1497586791321,'MM-dd')
 
 */

export function formatDate (time,format) {   
	return formatDates(time,format);
}

function formatDates(time,format){
    var date = new Date(time);
    var o = {
        "M+": date.getMonth() + 1, //month
        "d+": date.getDate(),    //day
        "h+": date.getHours(),   //hour
        "m+": date.getMinutes(), //minute
        "s+": date.getSeconds(), //second
        "q+": Math.floor((date.getMonth() + 3) / 3),  //quarter
        "S": date.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
    (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
      RegExp.$1.length == 1 ? o[k] :
        ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

export function fixedPic(source,dir='ba'){

    let dataReg = /\d{4}\/\d{2}\/\d{2}/,
        decodeReg = /\//gi,
        isHttp = /http/;

    if (dataReg.test(source) ) {
        source = source.replace(decodeReg,'%2F').replace(/\|\|.*/,'');
        return url+dir+'/ui/download?filepath=' + source;
    } else if(isHttp.test(source)){
        return source;
    }else{
         return url+dir+'/ui/download?filepath=' + source;
    }

}

export function departUrl(url){
    let arr = url.split('\?');
    let args = arr[1].split('&')
    let obj = {
        url : arr[0],
        args : []
    }

    args.forEach(function(value){
        let ars = value.split('=');
        obj.args.push({
            key : ars[0],
            value : ars[1]
        })
    }, this);

    return obj;
}

export function secondToTime(second){
    let hour = 0;
    let min = 0;
    if(second>=3600){
        hour = parseInt(second/3600);
        second -= hour * 3600;
    }
    if(second>=60){
        min = parseInt(second/60);
        second -= min * 60;
    }
    if(hour>0){
        return hour + '时' + min + '分'
    }
    return min + '分' + second + '秒'
}

export function getDateDiff(startDate){  
    var endTime = new Date().getTime();     
    var startTime = new Date(Date.parse(startDate.replace(/-/g,   "/"))).getTime();     
    var dates = parseInt(endTime/(1000*60*60*24))-parseInt(startTime/(1000*60*60*24));
    return dates;    
}

export function extend(obj, params, callback){
    var animation = weex.requireModule('animation');
    var id = params.id;
    var duration = params.duration;
    var width = params.width;
    var opacity = params.opacity || '1';
    var delay = params.delay;
    var transformOrigin = params.transformOrigin || 'left center';
    var timingFunction = params.timingFunction || 'ease';
    var el = obj.$refs[id];

    animation.transition(el, {
        styles: {
            opacity: opacity,
            width: width
        },
        duration: duration || 0,
        timingFunction: timingFunction,
        delay: delay || 0
    }, function () {
        callback && callback();
    });
}

export function createArr (arrName='') {
    storage.getItem(arrName,(res)=>{
        if (res.data === 'undefined') {
           storage.setItem(arrName,JSON.stringify([]));
        }
    })
    
}

export function manageArr(arrName='',obj = {},maxLength = 3) {
    let id = obj.id;
        // arr = obj.data;
   storage.getItem(arrName,(res)=>{
        if (res.data != 'undefined') {
           let arr = JSON.parse(res.data);
           let isExit = false;
           if (arr.length === 0) {
                arr.push(obj);
           }else{
               for (let i = 0,len=arr.length; i < len; i++) {
                    if(arr[i].id === id){
                       arr[i] = obj;
                       isExit = true;
                       break;
                   }
               }

                if (!isExit) {
                    arr.push(obj);
                }
             
               while(arr.length > maxLength){
                   arr.shift();
               }
           }
           storage.setItem(arrName,JSON.stringify(arr));
        }
    })
    
}

export let one = (fn)=>{
    if(one.flag){
        one.flag = false;
        fn && fn();
    }
}
one.flag = true;