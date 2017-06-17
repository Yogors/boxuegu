//编辑课程分类
define([
        "jquery", 'template', "text!tpls/courseListEdit.html", 'bootstrap'
    ],
    function ($, template, courseListEdit) {
        return function (cg_id) {
            $('body').find('.modal').remove();

            $.ajax({
                type: 'get',
                data: {
                    cg_id: cg_id
                },
                url: '/api/category/edit',
                success: function (res) {
                    var courseListEditStr = template.render(courseListEdit, {
                        result: res.result
                    });
                    var $modelTpl = $(courseListEditStr);

                    $modelTpl.appendTo('body').modal();

                    $modelTpl.on('submit', 'form', function () {
                        var dataForm = $(this).serialize();
                        $.post('/api/category/modify', dataForm, function (res) {
                            if (res.code != 200) {
                                console.log(res.msg);
                                return;
                            };
                            // $('.modal').modal('hide');
                            $('#courseListEdit').modal('hide');
                            $('#courseCategoryManager').click();
                        })
                        return false;
                    })

                }
            })

        }
    })