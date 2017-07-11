
let debug = true;
let url,ssoUrl,username,password;


if (debug) {
	url = 'http://ba.depts.bingosoft.net:8088/';
	ssoUrl = 'https://link.bingocc.cc:5443/sso';
	username = '13640427907';
	password = 'bingo@123';
} else {
	url = 'https://ba1.bingocc.com:18088/';
	ssoUrl = 'https://www.bingolink.biz/sso';
	username = '';
	password = '';
}


export {
	url,
	ssoUrl,
	username,
	password
}
