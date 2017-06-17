//课程基本信息完善
define([
    "jquery", 'template', "text!tpls/coursePicEdit.html", 'common/courseManageApi', 'bootstrap', 'uploadify'
], function ($, template, coursePicEdit, api) {
    return function (cs_id) {
        api.getCoursePicInfo(cs_id, function (res) {
            $('.module-container').empty();

            console.log('我要编辑图片了');
            console.log(res);
            var coursePicEditTpl = template.render(coursePicEdit, {
                result: res.result
            });
            var $coursePicEditTpl = $(coursePicEditTpl);
            $coursePicEditTpl.appendTo('.module-container');
            $coursePicEditTpl.find('#coursePicCheck').uploadify({
                formData: {
                    cs_id: cs_id
                },
                'swf': ' ../assets/uploadify/uploadify.swf',
                'uploader': '/api/uploader/cover',
                fileObjName: 'cs_cover_original',
                fileTypeExts: '*.gif;*.jog;*.png',
                buttonText: '选择图片',
                onUploadComplete: function () {
                    $('#courseListManager').click();
                }
            })
        });
    }
})