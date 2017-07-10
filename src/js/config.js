
let debug = true;
let url,ssoUrl,username,password;


if (debug) {
	url = 'http://ba.depts.bingosoft.net:8088/';
	ssoUrl = 'https://10.201.76.141/sso/';
	username = '13751876401';
	password = '123456';
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
