//讲师管理列表
define(['jquery', 'template', 'text!tpls/teacherAdd.html', 'text!tpls/teacherList.html', 'text!tpls/teacherInfoView.html', 'text!tpls/teacherEdit.html', 'common/courseManageApi', 'assets/bootstrap-datetimepicker/js/bootstrap-datetimepicker', 'lang'], function ($, template, teacherAddTpl, teacherListTpl, teacherInfoViewTpl, teacherEditTpl, api) {
    return function () {
        api.getTeacherList(function (res) {
            // console.log(res);
            var teacherListStr = template.render(teacherListTpl, {
                result: res.result
            });
            var $teacherListStr = $(teacherListStr);
            $teacherListStr.appendTo('.module-container');
            //点击添加讲师
            $teacherListStr.find($('#addTeacherBtn')).on('click', function () {

                $('.module-container').empty();
                var $teacherAddTpl = $(teacherAddTpl);
                $teacherAddTpl.appendTo('.module-container');
                //01加载添加讲师模板
                //日期控件
                $('#datetimepicker').datetimepicker({
                    format: 'yyyy-mm-dd',
                    minView: "month", //选择日期后，不会再跳转去选择时分秒 
                    language: 'zh-CN',
                    autoclose: 1,
                    todayBtn: true,
                });
                //02提交表单发送ajax请求并刷新页面
                $teacherAddTpl.on('submit', 'form', function () {
                    api.addTeacher($(this).serialize(), function (res) {
                        // console.log(res);
                        // console.log('我成功提交添加教师按钮啦');
                        $('#teacherManager').click();
                    })
                    return false;
                })
            })
            //表单注销按钮点击事件，切换讲师状态
            $teacherListStr.find('.statusBtn').on('click', function () {
                var obj = {
                    tc_id: $(this).parent().attr('tc_id'),
                    tc_status: $(this).parent().attr('tc_status')
                }
                api.changeTeacherStatus(obj, function () {
                    $('#teacherManager').click();
                })
            });
            //表单查看按钮点击事件，查看讲师信息
            $teacherListStr.find('.showBtn').on('click', function (res) {
                $('#teacherInfoView').remove();
                var obj = {
                    tc_id: $(this).parent().attr('tc_id'),
                }
                api.showTeacherInfo(obj, function (res) {
                    // console.log(res);
                    var teacherInfoTpl = template.render(teacherInfoViewTpl, {
                        result: res.result
                    });
                    var $teacherInfoTpl = $(teacherInfoTpl);
                    $teacherInfoTpl.modal();
                })
            });
            //表单编辑按钮，编辑讲师信息
            $teacherListStr.find('.editBtn').on('click', function () {
                $('.module-container').empty();
                var obj = {
                    tc_id: $(this).parent().attr('tc_id'),
                };
                //01-发送ajax请求获取原讲师信息并渲染到模板中
                api.editTeacher(obj, function (res) {
                    console.log(res);
                    // 准备模版teacherEdit.html
                    var teacherEditRes = template.render(teacherEditTpl, {
                        result: res.result
                    });

                    var $teacherEditRes = $(teacherEditRes);
                    $teacherEditRes.appendTo($('.module-container'));
                    //日期控件
                    $('#datetimepicker').datetimepicker({
                        format: 'yyyy-mm-dd',
                        minView: "month", //选择日期后，不会再跳转去选择时分秒 
                        language: 'zh-CN',
                        autoclose: 1,
                        todayBtn: true,
                    });

                    //02-表单提交,发送ajax请求并刷新页面，以同时修改服务器及页面信息
                    $teacherEditRes.on('submit', 'form', function () {
                        api.modifyTeacher($(this).serialize(), function (res) {
                            $('#teacherManager').click();
                        })
                        return false;
                    });
                });

            })
        })
    }
})