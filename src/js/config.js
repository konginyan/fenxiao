
let debug = true;
let url,ssoUrl,username,password;


if (debug) {
	url = 'http://ba.depts.bingosoft.net:8088/';
	ssoUrl = 'https://link.bingocc.cc:5443/sso';
	username = 'wangxj';
	password = 'smilekaje';
} else {
	url = 'http://ba1.bingocc.com:18088/';
	ssoUrl = 'https://www.bingolink.biz/sso';
	username = 'wangxj';
	password = 'smilekaje';
}


export {
	url,
	ssoUrl,
	username,
	password
}
