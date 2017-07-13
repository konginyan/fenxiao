
let debug = true;
let url,ssoUrl,username,password;


if (debug) {
	url = 'http://ba.depts.bingosoft.net:8088/';
	ssoUrl = 'https://link.bingocc.cc:5443/sso';
	username = '13527139636';
	password = 'bingo@123';
} else {
	url = 'http://ba1.bingocc.com:18088/';
	ssoUrl = 'https://www.bingolink.biz/sso';
	username = '13527139636';
	password = 'bingo@123';
}


export {
	url,
	ssoUrl,
	username,
	password
}
