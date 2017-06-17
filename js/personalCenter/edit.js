//个人中心
define(['jquery', 'template', 'text!tpls/personalInfo.html', 'common/courseManageApi', './passwordReset', 'assets/bootstrap-datetimepicker/js/bootstrap-datetimepicker', 'uploadify', 'uEditor', 'uEditorConf'], function ($, template, personalInfoTpl, api, passwordReset) {
    return function () {
        // console.log('个人中心');
        api.personalProfile(function (res) {
            var personalInfoRes = template.render(personalInfoTpl, {
                result: res.result
            });
            var $personalInfoRes = $(personalInfoRes);
            $personalInfoRes.appendTo('.module-container');
            //上传头像
            $personalInfoRes.find('#tcAvatar').uploadify({
                'swf': ' ../assets/uploadify/uploadify.swf',
                'uploader': '/api/uploader/avatar',
                fileObjName: 'tc_avatar',
                fileTypeExts: '*.gif;*.jpg;*.png',
                buttonText: '选择图片',
                onUploadComplete: function () {
                    $('#personalInfoEdit').click();
                }
            })
            //添加日期控件
            $('#datetimepicker1').datetimepicker({
                format: 'yyyy-mm-dd',
                minView: "month", //选择日期后，不会再跳转去选择时分秒 
                language: 'zh-CN',
                autoclose: 1,
                todayBtn: true,
            });
            //ueditor
            var ue = UE.getEditor('container');
            //忘记密码
            $personalInfoRes.find('#forgetPass').on('click', function () {
                $('.module-container').empty();
                passwordReset();
            });
            $personalInfoRes.on('submit', 'form', function () {
                var formData = $(this).serialize();
                console.log(formData);
                api.modifyPersonalInfo(formData, function (res) {
                    location.reload();
                });
                return false;
            })
        })
    }
})