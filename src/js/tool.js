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
 	
 
 */

export function formatDate (time,show) {
	return new Date(time).formatDate(show);
}

Date.prototype.formatDate = function (format){
    var o = {
        "M+": this.getMonth() + 1, //month
        "d+": this.getDate(),    //day
        "h+": this.getHours(),   //hour
        "m+": this.getMinutes(), //minute
        "s+": this.getSeconds(), //second
        "q+": Math.floor((this.getMonth() + 3) / 3),  //quarter
        "S": this.getMilliseconds() //millisecond
    }
    if (/(y+)/.test(format)) format = format.replace(RegExp.$1,
    (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o) if (new RegExp("(" + k + ")").test(format))
        format = format.replace(RegExp.$1,
      RegExp.$1.length == 1 ? o[k] :
        ("00" + o[k]).substr(("" + o[k]).length));
    return format;
}

export function fixedPic(source){
    let dataReg = /\d{4}\/\d{2}\/\d{2}/,
        decodeReg = /\//gi;

    if (dataReg.test(source) ) {
        source = source.replace(decodeReg,'%2F').replace(/\|\|.*/,'');
        return 'http://ba.depts.bingosoft.net:8088/ba/ui/download?filepath=' + source;
    } else {
        return source;
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

export function getDateDiff(startDate)  
{  
    var endTime = new Date().getTime();     
    var startTime = new Date(Date.parse(startDate.replace(/-/g,   "/"))).getTime();     
    var dates = (endTime - startTime)/(1000*60*60*24);     
    return  dates;    
}