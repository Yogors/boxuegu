//课程基本信息完善
define([
        "jquery", 'template', "text!tpls/courseManageAdd.html", 'common/courseManageApi', 'bootstrap'
    ],
    function ($, template, courseManageAddTpl, api) {
        return function () {
            var cs_id = $('#courseInfoAdd').attr('cs_id');
            //触发conmon/courseManageApi.js中的getCourseBaseInfo方法
            api.getCourseBaseInfo(cs_id, function (res) {
                $('.module-container').empty();
                var courseBaseInfoTpl = template.render(courseManageAddTpl, {
                    result: res.result
                });
                var $courseBaseInfoTpl = $(courseBaseInfoTpl);
                $courseBaseInfoTpl.appendTo($('.module-container'));

                //触发顶级分类onchange事件以实时更新二级分类select下拉框信息
                $courseBaseInfoTpl.on('change', '.topCategory', function () {
                    var cg_id = $(this).val();
                    $.get('/api/category/child', {
                        cg_id: cg_id
                    }, function (res) {
                        if (res.code != 200) {
                            console.log(res.msg);
                            return;
                        }
                        var resultArr = res.result;
                        var $selectSecond = $courseBaseInfoTpl.find('.secondCategory');
                        $selectSecond.empty();
                        resultArr.forEach(function (value) {
                            $selectSecond.append("<option value='" + value.cg_id + "'>" + value.cg_name + "</option>");
                        })
                    })
                })
                //确定提交更改课程基本信息
                $('#editBaseInfo').on('submit', 'form', function () {
                    var dataForm = $(this).serialize();
                    $.post('/api/course/update/basic', dataForm, function (res) {
                        console.log(res);
                        if (res.code != 200) {
                            console.log(res.msg);
                            return;
                        }
                        $('#courseListManager').click();
                    })
                    return false;
                })
            })

        }
    })