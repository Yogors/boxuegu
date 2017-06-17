//判断用户登录状态
define(['jquery', 'cookie'], function () {
    var tc_name = $.cookie('tc_name');
    var tc_avatar = $.cookie('tc_avatar');

    if (!tc_name) {
        location.href = "login.html"
    };
})