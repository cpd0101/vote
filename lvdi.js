/**
 * 投票地址：http://weixin.g-club.com/QieMap/Share.aspx?code=0018f1c0a3be5c7f243c4f3cf93c170I&state=18129
 */

var randomIp = function (len) {
    len = len || 4;
    var ip = '';
    for(var i = 0; i < len; i++) {
        ip += Math.ceil(Math.random() * 243) + '.';
    }
    ip = ip.slice(0, ip.length - 1);
    return ip;
};

var randomString = function (len) {
    len = len || 32;
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijlkmnopqrstuvwxyz0123456789';    
    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    // var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678'; 
    var maxPos = chars.length;
    var str = '';
    for (var i = 0; i < len; i++) {
        str += chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return str;
};

var lvdi = function (count, id) {
    setTimeout(function () {
        var ip = randomIp(4);
        var callee = arguments.callee;
        $.ajax({
            url: '/api/QieMap.FreindSupportTravel',
            type: 'POST',
            data: '{\"UserCode": \"' + randomString(28) + '\", \"TravelId\": \"' + id + '\"}',
            beforeSend: function (request) {
                request.setRequestHeader('CLIENT-IP', ip);
                request.setRequestHeader('X-FORWARDED-FOR', ip);
            },
            success: function (data) {
                if (--count) {
                    setTimeout(callee, Math.ceil(Math.random() * 1000 * 1));
                }
            }
        });
    }, Math.ceil(Math.random() * 1000 * 1));
};