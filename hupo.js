var randomIp = function (len) {
    len = len || 4;
    var ip = '';
    for(var i = 0; i < len; i++) {
        ip += Math.ceil(Math.random() * 243) + '.';
    }
    ip = ip.slice(0, ip.length - 1);
    return ip;
};

var hupo = function (count, id) {
    setTimeout(function () {
        var ip = randomIp(4);
        var callee = arguments.callee;
        $.ajax({
            url: '/ajaxpro/Web.WebSite.HupoTicket,Web.ashx',
            type: 'POST',
            data: '{\"isShare":1, \"openID\":\"' + id + '\"}',
            beforeSend: function (request) {
                request.setRequestHeader('Content-Type', 'Content-Type:text/plain; charset=UTF-8');
                request.setRequestHeader('X-AjaxPro-Method', 'Add');
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