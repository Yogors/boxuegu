//课程管理中子菜单ajax请求及其回调函数触发
define(['jquery', 'template', 'text!tpls/courseTimeManageEdit.html', 'text!tpls/courseTimeManageAdd.html', 'text!tpls/courseCreate.html', 'text!tpls/courseManageAdd.html'], function ($, template, courseTimeManageEditTpl, courseTimeManageAddTpl, courseCreateTpl, courseManageAddTpl) {
    return {
        //添加课时
        courseTimeAdd: function () {
            console.log('我在api中添加了课时');
            $('#courseTimeManageHtml').remove();
            var cs_ct_id = $('#courseTimeManager').attr('cs_id');

            var courseAddTpl = template.render(courseTimeManageAddTpl, {
                result: {
                    'ct_cs_id': cs_ct_id
                }
            })
            var $courseAddTpl = $(courseAddTpl);
            $courseAddTpl.modal();
            $courseAddTpl.on('submit', 'form', function () {
                var dataForm = $(this).serialize();
                // console.log(dataForm);
                $.post('/api/course/chapter/add', dataForm, function (res) {
                    if (res.code != 200) {
                        console.log(res.msg);
                        return;
                    }
                    console.log(res);
                    console.log(dataForm);
                    $('#courseTimeManageHtml').modal('hide');
                    $('#courseTimeManager').click();
                })
                return false;
            })
        },
        //编辑课时
        courseEdit: function (ct_id) {
            $('.modal').remove();
            $('#courseTimeManageEdit').remove();
            $.get('/api/course/chapter/edit', {
                'ct_id': ct_id
            }, function (res) {
                console.log(res);
                if (res.code != 200) {
                    console.log(res.msg);
                    return;
                }
                var courseTimeManageEditStr = template.render(courseTimeManageEditTpl, {
                    result: res.result
                });
                var $courseTimeManageEditStr = $(courseTimeManageEditStr);
                // $('body').remove($courseTimeManageEditStr);
                // $('.modal').remove();
                $courseTimeManageEditStr.modal();

                $courseTimeManageEditStr.on('submit', 'form', function () {
                    var dataForm = $(this).serialize();
                    // console.log(dataForm);
                    $.ajax({
                        data: dataForm,
                        url: '/api/course/chapter/modify',
                        type: 'post',
                        success: function (res) {
                            // console.log(res);
                            if (res.code != 200) {
                                console.log(res.msg);
                                return;
                            }
                            $('#courseTimeManageEdit').modal('hide');
                            $('#courseTimeManager').click();
                        }
                    })
                    return false;
                })
            })
        },
        //创建课程
        courseCreate: function () {
            $('#courseCreate').remove();
            var $courseCreateTpl = $(courseCreateTpl);
            // $courseCreateTpl.appendTo($('.module-container'));
            $courseCreateTpl.modal();
            $courseCreateTpl.on('submit', 'form', function () {
                var dataForm = $(this).serialize();
                $.post('/api/course/create', dataForm, function (res) {
                    if (res.code != 200) {
                        console.log(res.msg);
                        return;
                    }
                    $courseCreateTpl.modal('hide');
                    $('#courseListManager').click();
                })
                return false;
            })
        },
        //添加课程
        courseAdd: function () {
            $('.module-container').html('');
            var $courseManageAddTpl = $(courseManageAddTpl);
            $courseManageAddTpl.appendTo($('.module-container'));
        },
        //获取及设置课程基本信息
        getCourseBaseInfo: function (cs_id, callback) {
            $.get('/api/course/basic', {
                cs_id: cs_id
            }, function (res) {
                if (res.code != 200) {
                    console.log(res.msg);
                    return;
                }
                callback && callback(res);
            })
        },
        getCoursePicInfo: function (cs_id, callback) {
            $.get('/api/course/picture', {
                cs_id: cs_id
            }, function (res) {
                if (res.code != 200) {
                    console.log(res.msg);
                    return;
                }
                callback && callback(res);
            })
        },
        getTeacherList: function (callback) {
            $.get('/api/teacher',
                function (res) {
                    if (res.code != 200) {
                        console.log(res.msg);
                        return;
                    }
                    callback && callback(res);
                })
        },
        changeTeacherStatus: function (obj, callback) {
            $.post('/api/teacher/handle', obj,
                function (res) {
                    if (res.code != 200) {
                        console.log(res.msg);
                        return;
                    }
                    callback && callback(res);
                })
        },
        showTeacherInfo: function (obj, callback) {
            $.get('/api/teacher/view', obj,
                function (res) {
                    if (res.code != 200) {
                        console.log(res.msg);
                        return;
                    }
                    callback && callback(res);
                })
        },
        addTeacher: function (obj, callback) {
            $.post('/api/teacher/add', obj,
                function (res) {
                    if (res.code != 200) {
                        console.log(res.msg);
                        return;
                    }
                    callback && callback(res);

                })
        },
        editTeacher: function (obj, callback) {
            $.get('/api/teacher/edit', obj,
                function (res) {
                    if (res.code != 200) {
                        console.log(res.msg);
                        return;
                    }
                    callback && callback(res);
                })
        },
        modifyTeacher: function (obj, callback) {
            $.post('/api/teacher/update', obj,
                function (res) {
                    if (res.code != 200) {
                        console.log(res.msg);
                        return;
                    }
                    callback && callback(res);
                })
        },
        personalProfile: function (callback) {
            $.get('/api/teacher/profile', function (res) {
                if (res.code != 200) {
                    console.log(res.msg);
                    return;
                }
                callback && callback(res);
            })
        },
        modifyPassword: function (obj, callback) {
            $.post('/api/teacher/repass', obj, function (res) {
                if (res.code != 200) {
                    console.log(res.msg);
                    return;
                }
                callback && callback(res);
            })
        },
        modifyPersonalInfo: function (obj, callback) {
            $.post('/api/teacher/modify', obj, function (res) {
                if (res.code != 200) {
                    console.log(res.msg);
                    return;
                }
                callback && callback(res);
            })
        },
    }
});