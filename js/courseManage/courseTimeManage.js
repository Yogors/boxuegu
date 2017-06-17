//课时管理
define(['jquery', 'template', 'text!tpls/courseTimeManage.html', 'common/courseManageApi'], function ($, template, courseManageTpl, api) {
    return function () {
        $('.module-container').empty();
        var cs_id = $('#courseTimeManager').attr('cs_id');
        cs_id = cs_id || 1;
        $.get('/api/course/lesson', {
            cs_id: cs_id
        }, function (res) {
            if (res.code != 200) {
                console.log(res.msg);
                return;
            }
            var lessonStr = template.render(courseManageTpl, {
                lesson: res.result.lessons
            })
            var $lessonStr = $(lessonStr);
            $('.module-container').html('');

            $lessonStr.appendTo('.module-container');

            $('.courseTimeEditBtn').click(function () {
                var ct_id = $(this).attr('ct_id');
                api.courseEdit(ct_id);
            });
            $('#addCourseTimeBtn').click(function () {
                api.courseTimeAdd();
            });

        })
    }
})