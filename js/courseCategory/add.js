//添加课程分类
define([
        "jquery", 'template', "text!tpls/courseListAdd.html", 'bootstrap'
    ],
    function ($, template, courseListAdd) {
        return function () {
            $('body').find('.modal').remove();
            $.get('/api/category/top', function (res) {
                if (res.code != 200) {
                    console.log(res.msg);
                    return;
                }
                var courseListLevel1 = template.render(courseListAdd, {
                    result: res.result
                });
                var $modelTpl = $(courseListAdd);
                $(courseListLevel1).appendTo('body').modal();

                $('.modal').on('submit', 'form', function () {
                    var FormData = $(this).serialize();
                    $.ajax({
                        url: '/api/category/add',
                        type: 'post',
                        data: FormData,
                        success: function () {
                            console.log(FormData);
                            location.reload();
                        }
                    })
                    return false;
                })
            })
        }
    })