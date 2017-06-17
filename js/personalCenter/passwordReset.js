//个人中心_忘记密码
define(['jquery', 'template', 'text!tpls/personalPassword.html', 'common/courseManageApi'], function ($, template, personalPasswordTpl, api, passwordReset) {
    return function () {
        var $personalPasswordTpl = $(personalPasswordTpl);
        $personalPasswordTpl.appendTo('.module-container');
        $personalPasswordTpl.on('submit', 'form', function () {
            if ($('.newPass1').val() != $('.newPass2').val()) {
                alert('两次新密码输入不一致，请重新输入');
                // $personalPasswordTpl.find('input').value('');
                return;
            }
            api.modifyPassword($(this).serialize(), function (res) {
                console.log(res);
                location.href = "login.html"
            })
            return false;
        })

    }
})