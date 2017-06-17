//获取课程列表及触发列表中各事件触发（编辑课时、课程管理、图片编辑）
define(['jquery', 'template', 'text!tpls/courseManageList.html', 'courseManage/courseTimeManage', 'common/courseManageApi'], function ($, template, courseManageListTpl, counseCategoryList, api) {
    return function () {
        $.get('/api/course', function (res) {
            // console.log(res);
            if (res.code != 200) {
                console.log(res.smg);
                return;
            }
            var courseManageListStr = template.render(courseManageListTpl, {
                result: res.result
            })
            var $courseManageListStr = $(courseManageListStr);
            $courseManageListStr.appendTo('.module-container');
            $('.right').on('click', '.courseTimeEdit', function () {
                var cs_id = $(this).attr('cs_id');
                $('#courseTimeManager').attr('cs_id', cs_id);
                $('.module-container').empty();
                $('#courseTimeManager').click();
            });
            $('.right').on('click', '.courseBaseInfoBtn', function () {
                var cs_id = $(this).attr('cs_id');
                $('#courseInfoAdd').attr('cs_id', cs_id);
                $('.module-container').empty();
                $('#courseInfoAdd').click();
            });
            $('.right').on('click', '.picEditBtn', function () {
                var cs_id = $(this).attr('cs_id');
                $('#courseListImgs').attr('cs_id', cs_id);
                $('#courseListImgs').click();
            })
        })
    }
})