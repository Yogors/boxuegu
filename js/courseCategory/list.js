//获取课程列表
define([
        "jquery", 'template', "text!../tpls/courseListTpl.html", './add', './edit'
    ],
    function ($, template, courseListTpl, addCourseCategoryBtn, editCourseCategoryBtn) {
        return function () {
            $.get('/api/category', function (res) {
                if (res.code != 200) {
                    console.log(res.msg);
                    return;
                }
                // console.log(res);
                var result = res.result;
                var courseListTplRes = template.render(courseListTpl, {
                    result: result
                })
                //把渲染好的元素放到页面中
                var $courseListTplRes = $(courseListTplRes);
                $(".module-container").append(courseListTplRes);
                $('#addCourseCategoryBtn').click(function () {
                    addCourseCategoryBtn();
                });
                $('table').on('click', 'button', function () {
                    var cg_id = $(this).parent().attr('cg_id');
                    editCourseCategoryBtn(cg_id);
                })
            })
        }
    })